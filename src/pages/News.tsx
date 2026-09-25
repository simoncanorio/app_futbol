import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player, type Team, type Match, type League } from '../db/db';
import { Newspaper, Flame, Trophy, TrendingUp, UserCheck, ArrowRight } from 'lucide-react';

interface NewsArticle {
  id: string;
  category: string;
  categoryColor: string;
  headline: string;
  lead: string;
  body: string;
  source: string;
  time: string;
  relatedTeamId?: number;
  relatedPlayerId?: number;
}

export function News() {
  const { leagueId } = useParams();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    async function load() {
      const lid = Number(leagueId);
      if (!lid) return;

      const l = await db.leagues.get(lid);
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const allTeams = await db.teams.where('leagueId').equals(lid).toArray();
      const recentMatches = await db.matches.where('leagueId').equals(lid).filter(m => m.isPlayed).reverse().toArray();

      if (allTeams.length === 0 || allPlayers.length === 0) return;

      const sortedByPts = [...allTeams].sort((a, b) => {
        const ptsA = a.wins * 3 + a.draws;
        const ptsB = b.wins * 3 + b.draws;
        return ptsB - ptsA;
      });

      const leaderTeam = sortedByPts[0];
      const userTeam = l?.userTeamId ? allTeams.find(t => t.id === l.userTeamId) : null;
      const topScorer = [...allPlayers].sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0))[0];
      const eliteStar = [...allPlayers].sort((a, b) => b.overall - a.overall)[0];

      const generated: NewsArticle[] = [];

      // 1. Title Race & Leader Article
      if (leaderTeam) {
        generated.push({
          id: 'news-1',
          category: 'Competición & Carrera al Título',
          categoryColor: '#eab308',
          headline: `El dominio de ${leaderTeam.name} marca el pulso de la liga`,
          lead: `Con ${leaderTeam.wins * 3 + leaderTeam.draws} puntos acumulados, el equipo dirigido muestra una solvencia intratable en la cima de la tabla.`,
          body: `Los analistas destacan la solidez defensiva y la pegada del conjunto. Sus rivales directos se ven obligados a no ceder un solo punto si quieren mantener viva la esperanza del campeonato. La afición celebra una temporada histórica.`,
          source: 'Diario Deportivo',
          time: 'Hace 2 horas',
          relatedTeamId: leaderTeam.id
        });
      }

      // 2. User Team Special Focus
      if (userTeam) {
        const uPoints = userTeam.wins * 3 + userTeam.draws;
        generated.push({
          id: 'news-2',
          category: 'Foco en el Club',
          categoryColor: '#38bdf8',
          headline: `La directiva de ${userTeam.name} evalúa el plan estratégico de la temporada`,
          lead: `Con un balance de ${userTeam.wins} victorias y ${userTeam.losses} derrotas, el club afronta semanas decisivas para cumplir los objetivos marcados.`,
          body: `El vestuario de ${userTeam.name} se conjura para sumar de tres en tres. La dirección deportiva mantiene monitorizado el mercado de fichajes y la evolución de los jóvenes canteranos para asegurar la competitividad a corto y medio plazo.`,
          source: 'Cadena Deportiva',
          time: 'Hace 4 horas',
          relatedTeamId: userTeam.id
        });
      }

      // 3. Top Scorer / Pichichi Feature
      if (topScorer && (topScorer.stats?.goals || 0) > 0) {
        generated.push({
          id: 'news-3',
          category: 'Goleadores & Estrellas',
          categoryColor: '#ef4444',
          headline: `Fiebre de gol: ${topScorer.name} lidera la tabla de artilleros con ${topScorer.stats?.goals} dianas`,
          lead: `El delantero vive un momento dulce de cara a puerta y se posiciona como el favorito al trofeo de máximo realizador.`,
          body: `Su capacidad de desmarque y contundencia en los últimos metros están decidiendo partidos de alto calibre. Su entrenador elogió su compromiso y trabajo sin balón tras la última sesión de entrenamiento.`,
          source: 'Mundo Fútbol',
          time: 'Hace 6 horas',
          relatedPlayerId: topScorer.id
        });
      } else if (eliteStar) {
        generated.push({
          id: 'news-3-alt',
          category: 'Estrellas Mundiales',
          categoryColor: '#8b5cf6',
          headline: `La magia de ${eliteStar.name} deslumbra en cada jornada`,
          lead: `Con una valoración de ${eliteStar.overall} OVR, el astro internacional continúa siendo la gran atracción de la liga.`,
          body: `Los aficionados llenan las gradas en cada partido para ver sus regates y asistencias magistrales. Todos los focos apuntan a su liderazgo sobre el terreno de juego.`,
          source: 'Mundo Fútbol',
          time: 'Hace 6 horas',
          relatedPlayerId: eliteStar.id
        });
      }

      // 4. Match Highlights / Last Matchday
      if (recentMatches.length > 0) {
        const lastM = recentMatches[0];
        const h = allTeams.find(t => t.id === lastM.homeTeamId);
        const a = allTeams.find(t => t.id === lastM.awayTeamId);
        if (h && a) {
          generated.push({
            id: 'news-4',
            category: 'Crónica de la Jornada',
            categoryColor: '#10b981',
            headline: `Duelo de titanes: ${h.name} y ${a.name} protagonizan un electrizante ${lastM.homeScore}-${lastM.awayScore}`,
            lead: `Un encuentro repleto de ocasiones, transiciones vertiginosas y tensión hasta el silbato final.`,
            body: `Ambos técnicos plantearon propuestas ambiciosas que mantuvieron a las aficiones con el corazón en un puño. Los puntos repartidos reconfiguran la parte alta de la clasificación de cara a las próximas jornadas.`,
            source: 'Agencia EFE Deportes',
            time: 'Ayer',
            relatedTeamId: h.id
          });
        }
      }

      // 5. Transfer Market & Scouts Radar
      generated.push({
        id: 'news-5',
        category: 'Mercado & Ojeadores',
        categoryColor: '#f97316',
        headline: `La red de ojeadores intensifica el seguimiento de promesas internacionales`,
        lead: `Directores deportivos de toda Europa cruzan informes antes de la próxima ventana de transferencias.`,
        body: `Se multiplican los viajes de scouting a ligas sudamericanas y campeonatos juveniles en busca del próximo talento generacional. Varios clubes ya preparan ofertas millonarias para anticiparse a sus competidores.`,
        source: 'Transfer Express',
        time: 'Ayer'
      });

      setArticles(generated);
    }
    load();
  }, [leagueId]);

  const filtered = selectedCategory === 'ALL'
    ? articles
    : articles.filter(a => a.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
      <div className="page-header" style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.2)', paddingBottom: '1rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#f8fafc', margin: 0 }}>
          <Newspaper color="#38bdf8" size={30} /> Portada de Noticias de la Liga
        </h1>
        <p style={{ color: '#94a3b8', margin: '6px 0 0 0', fontSize: '0.9rem' }}>
          Crónicas de partidos, carrera por el título, ruedas de prensa y actualidad del mercado deportivo.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {[
          { id: 'ALL', label: 'Todas las Noticias' },
          { id: 'Competición', label: '🏆 Título & Liga' },
          { id: 'Club', label: '🏟️ Tu Club' },
          { id: 'Goleadores', label: '⭐ Goleadores' },
          { id: 'Mercado', label: '💼 Fichajes' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: selectedCategory === cat.id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
              background: selectedCategory === cat.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.04)',
              color: selectedCategory === cat.id ? '#38bdf8' : '#94a3b8',
              fontSize: '0.82rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filtered.map(art => (
          <article
            key={art.id}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              borderRadius: '12px',
              borderLeft: `4px solid ${art.categoryColor}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
              <span style={{
                background: `${art.categoryColor}25`,
                color: art.categoryColor,
                padding: '3px 8px',
                borderRadius: '6px',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                {art.category}
              </span>
              <span style={{ color: '#64748b' }}>{art.source} • {art.time}</span>
            </div>

            <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.3rem', lineHeight: '1.3' }}>
              {art.headline}
            </h2>

            <p style={{ margin: 0, color: '#cbd5e1', fontWeight: 500, fontSize: '0.95rem', lineHeight: '1.4' }}>
              {art.lead}
            </p>

            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5' }}>
              {art.body}
            </p>

            {art.relatedTeamId && (
              <div style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                <Link
                  to={`/l/${leagueId}/team/${art.relatedTeamId}`}
                  style={{ color: '#38bdf8', fontSize: '0.82rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}
                >
                  Ver plantilla del club ➡️
                </Link>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
