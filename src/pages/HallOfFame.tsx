import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, type Player } from '../db/db';
import { Trophy, Star, Search, Award, Shield, Flame } from 'lucide-react';

interface Legend {
  id: string | number;
  name: string;
  country: string;
  position: 'POR' | 'DEF' | 'MED' | 'DEL';
  specificPosition: string;
  peakOvr: number;
  era: string;
  clubs: string;
  trophies: string;
  careerGoals: number;
  careerAssists: number;
  careerApps: number;
  bio: string;
  isCustomRetired?: boolean;
}

const ALL_TIME_LEGENDS: Legend[] = [
  {
    id: 'pele',
    name: 'Pelé (Edson Arantes do Nascimento)',
    country: 'Brasil',
    position: 'DEL',
    specificPosition: 'DC',
    peakOvr: 98,
    era: '1956 - 1977',
    clubs: 'Santos FC, NY Cosmos',
    trophies: '🏆 3x Copas del Mundo (1958, 1962, 1970), 2x Intercontinental',
    careerGoals: 767,
    careerAssists: 260,
    careerApps: 831,
    bio: 'El Rey del Fútbol. Único jugador en la historia en levantar tres Copas Mundiales de la FIFA.'
  },
  {
    id: 'maradona',
    name: 'Diego Armando Maradona',
    country: 'Argentina',
    position: 'MED',
    specificPosition: 'MCO',
    peakOvr: 97,
    era: '1976 - 1997',
    clubs: 'SSC Napoli, FC Barcelona, Boca Juniors, Argentinos Jrs',
    trophies: '🏆 1x Copa del Mundo (1986), 2x Serie A, 1x Copa UEFA',
    careerGoals: 345,
    careerAssists: 240,
    careerApps: 679,
    bio: 'El Pibe de Oro. Autor del Gol del Siglo y la Mano de Dios. Condujo al Nápoles y a Argentina a la gloria eterna.'
  },
  {
    id: 'messi',
    name: 'Lionel Messi',
    country: 'Argentina',
    position: 'DEL',
    specificPosition: 'ED',
    peakOvr: 99,
    era: '2004 - Presente',
    clubs: 'FC Barcelona, Paris SG, Inter Miami',
    trophies: '🏆 8x Balón de Oro, 1x Copa del Mundo (2022), 4x Champions League, 2x Copa América',
    careerGoals: 835,
    careerAssists: 372,
    careerApps: 1060,
    bio: 'El jugador más laureado de la historia. Récord de 8 Balones de Oro y 91 goles oficiales en un solo año natural (2012).'
  },
  {
    id: 'cr7',
    name: 'Cristiano Ronaldo',
    country: 'Portugal',
    position: 'DEL',
    specificPosition: 'DC',
    peakOvr: 99,
    era: '2002 - Presente',
    clubs: 'Real Madrid, Manchester United, Juventus, Sporting CP, Al Nassr',
    trophies: '🏆 5x Balón de Oro, 5x Champions League, 1x Eurocopa (2016)',
    careerGoals: 895,
    careerAssists: 251,
    careerApps: 1220,
    bio: 'Máximo goleador histórico del fútbol profesional y de la UEFA Champions League. 5 Copas de Europa.'
  },
  {
    id: 'cruyff',
    name: 'Johan Cruyff',
    country: 'Países Bajos',
    position: 'DEL',
    specificPosition: 'DC',
    peakOvr: 96,
    era: '1964 - 1984',
    clubs: 'AFC Ajax, FC Barcelona, Feyenoord',
    trophies: '🏆 3x Balón de Oro, 3x Copa de Europa, Subcampeón Mundial 1974',
    careerGoals: 402,
    careerAssists: 210,
    careerApps: 710,
    bio: 'Padre del Fútbol Total y arquitecto de la filosofía futbolística moderna tanto en el Ajax como en el Barcelona.'
  },
  {
    id: 'zidane',
    name: 'Zinedine Zidane',
    country: 'Francia',
    position: 'MED',
    specificPosition: 'MCO',
    peakOvr: 96,
    era: '1989 - 2006',
    clubs: 'Real Madrid, Juventus, Girondins de Bordeaux',
    trophies: '🏆 1x Balón de Oro (1998), 1x Copa del Mundo (1998), 1x Champions League, 1x Eurocopa',
    careerGoals: 125,
    careerAssists: 178,
    careerApps: 689,
    bio: 'Mago absoluto del control y la elegancia. Marcó la volea más legendaria en la final de Champions 2002.'
  },
  {
    id: 'ronaldo-r9',
    name: 'Ronaldo Nazário (R9)',
    country: 'Brasil',
    position: 'DEL',
    specificPosition: 'DC',
    peakOvr: 97,
    era: '1993 - 2011',
    clubs: 'Real Madrid, FC Barcelona, Inter, AC Milan, PSV, Cruzeiro',
    trophies: '🏆 2x Balón de Oro, 2x Copas del Mundo (1994, 2002), 2x Copa América',
    careerGoals: 414,
    careerAssists: 120,
    careerApps: 616,
    bio: 'El Fenómeno. Delantero centro más imparable y letal en carrera de la era moderna.'
  },
  {
    id: 'ronaldinho',
    name: 'Ronaldinho Gaúcho',
    country: 'Brasil',
    position: 'DEL',
    specificPosition: 'EI',
    peakOvr: 95,
    era: '1998 - 2015',
    clubs: 'FC Barcelona, AC Milan, Paris SG, Grêmio, Atlético Mineiro',
    trophies: '🏆 1x Balón de Oro (2005), 1x Copa del Mundo (2002), 1x Champions League, 1x Libertadores',
    careerGoals: 280,
    careerAssists: 195,
    careerApps: 712,
    bio: 'La sonrisa del fútbol. Magia pura, regates irrepetibles y ovación unánime en el Santiago Bernabéu.'
  },
  {
    id: 'di-stefano',
    name: 'Alfredo Di Stéfano',
    country: 'España / Argentina',
    position: 'DEL',
    specificPosition: 'DC',
    peakOvr: 97,
    era: '1945 - 1966',
    clubs: 'Real Madrid, Millonarios, River Plate, RCD Espanyol',
    trophies: '🏆 Súper Balón de Oro, 2x Balón de Oro, 5x Copas de Europa seguidas, 8x LaLiga',
    careerGoals: 509,
    careerAssists: 180,
    careerApps: 706,
    bio: 'La Saeta Rubia. Lideró al Real Madrid a ganar las primeras 5 Copas de Europa consecutivas de la historia.'
  },
  {
    id: 'beckenbauer',
    name: 'Franz Beckenbauer',
    country: 'Alemania',
    position: 'DEF',
    specificPosition: 'DFC',
    peakOvr: 96,
    era: '1964 - 1983',
    clubs: 'Bayern München, NY Cosmos, Hamburger SV',
    trophies: '🏆 2x Balón de Oro (1972, 1976), 1x Copa del Mundo (1974), 3x Copas de Europa, 1x Eurocopa',
    careerGoals: 109,
    careerAssists: 95,
    careerApps: 754,
    bio: 'El Káiser. Redefinió la posición del líbero. Elegancia defensiva, jerarquía táctica y liderazgo inquebrantable.'
  },
  {
    id: 'maldini',
    name: 'Paolo Maldini',
    country: 'Italia',
    position: 'DEF',
    specificPosition: 'LI',
    peakOvr: 95,
    era: '1984 - 2009',
    clubs: 'AC Milan',
    trophies: '🏆 5x Champions League / Copa de Europa, 7x Serie A, 1x Mundial de Clubes',
    careerGoals: 40,
    careerAssists: 43,
    careerApps: 902,
    bio: 'Il Capitano. 25 temporadas en el AC Milan, referencia mundial indiscutible del arte defensivo italiano.'
  },
  {
    id: 'yashin',
    name: 'Lev Yashin',
    country: 'Rusia (URSS)',
    position: 'POR',
    specificPosition: 'POR',
    peakOvr: 95,
    era: '1950 - 1970',
    clubs: 'Dinamo Moscú',
    trophies: '🏆 1x Balón de Oro (1963 - Único guardameta en la historia), 1x Eurocopa (1960)',
    careerGoals: 0,
    careerAssists: 0,
    careerApps: 420,
    bio: 'La Araña Negra. Primer y único portero en adjudicarse el Balón de Oro. Detuvo más de 150 penales oficiales.'
  },
  {
    id: 'buffon',
    name: 'Gianluigi Buffon',
    country: 'Italia',
    position: 'POR',
    specificPosition: 'POR',
    peakOvr: 94,
    era: '1995 - 2023',
    clubs: 'Juventus, Parma, Paris SG',
    trophies: '🏆 1x Copa del Mundo (2006), 10x Serie A, 1x Ligue 1, 1x Copa UEFA',
    careerGoals: 0,
    careerAssists: 0,
    careerApps: 1151,
    bio: 'Uno de los porteros más consistentes e imbatibles de todos los tiempos. Balón de Plata en el Mundial 2006.'
  },
  {
    id: 'xavi',
    name: 'Xavi Hernández',
    country: 'España',
    position: 'MED',
    specificPosition: 'MC',
    peakOvr: 94,
    era: '1998 - 2019',
    clubs: 'FC Barcelona, Al Sadd',
    trophies: '🏆 1x Copa del Mundo (2010), 2x Eurocopas (2008, 2012), 4x Champions League, 8x LaLiga',
    careerGoals: 112,
    careerAssists: 238,
    careerApps: 950,
    bio: 'El metrónomo del fútbol mundial. Director de orquesta del Barça del Sextete y de la España campeona del mundo.'
  },
  {
    id: 'iniesta',
    name: 'Andrés Iniesta',
    country: 'España',
    position: 'MED',
    specificPosition: 'MC',
    peakOvr: 94,
    era: '2001 - 2024',
    clubs: 'FC Barcelona, Vissel Kobe, Emirates Club',
    trophies: '🏆 1x Copa del Mundo (2010), 2x Eurocopas (2008, 2012), 4x Champions League, 9x LaLiga',
    careerGoals: 93,
    careerAssists: 172,
    careerApps: 885,
    bio: 'Don Andrés. Autor del gol eterno en el minuto 116 de la final de Sudáfrica 2010 que dio la Copa del Mundo a España.'
  },
  {
    id: 'henry',
    name: 'Thierry Henry',
    country: 'Francia',
    position: 'DEL',
    specificPosition: 'DC',
    peakOvr: 94,
    era: '1994 - 2014',
    clubs: 'Arsenal, FC Barcelona, AS Monaco, NY Red Bulls, Juventus',
    trophies: '🏆 1x Copa del Mundo (1998), 1x Eurocopa (2000), 1x Champions League (2009), 2x Premier League',
    careerGoals: 411,
    careerAssists: 185,
    careerApps: 917,
    bio: 'Líder del Arsenal de "Los Invencibles" (2003-04) y pieza clave en el triplete de 2009 con el FC Barcelona.'
  },
  {
    id: 'puskas',
    name: 'Ferenc Puskás',
    country: 'Hungría / España',
    position: 'DEL',
    specificPosition: 'DC',
    peakOvr: 96,
    era: '1943 - 1966',
    clubs: 'Real Madrid, Budapest Honvéd',
    trophies: '🏆 3x Copas de Europa, 5x LaLiga, Oro Olímpico 1952, Subcampeón Mundial 1954',
    careerGoals: 706,
    careerAssists: 160,
    careerApps: 718,
    bio: 'Cañoncito Pum. Legendaria zurda demoledora. La FIFA nombró el galardón al mejor gol del año en su honor.'
  },
  {
    id: 'platini',
    name: 'Michel Platini',
    country: 'Francia',
    position: 'MED',
    specificPosition: 'MCO',
    peakOvr: 95,
    era: '1972 - 1987',
    clubs: 'Juventus, AS Saint-Étienne, AS Nancy',
    trophies: '🏆 3x Balón de Oro consecutivos (1983, 1984, 1985), 1x Eurocopa (1984), 1x Copa de Europa',
    careerGoals: 354,
    careerAssists: 140,
    careerApps: 652,
    bio: 'Goleador irrepetible desde la mediapunta. Récord de 9 goles en una sola edición de Eurocopa (1984).'
  }
];

export function HallOfFame() {
  const { leagueId } = useParams();
  const [filterPos, setFilterPos] = useState<'ALL' | 'POR' | 'DEF' | 'MED' | 'DEL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [customLegends, setCustomLegends] = useState<Legend[]>([]);

  useEffect(() => {
    async function loadCustomHof() {
      const lid = Number(leagueId);
      if (!lid) return;
      const allPlayers = await db.players.where('leagueId').equals(lid).toArray();
      const retiredHof = allPlayers.filter(p => p.isHallOfFame);

      const converted: Legend[] = retiredHof.map(p => ({
        id: p.id || Math.random(),
        name: p.name,
        country: p.bio?.country || 'Internacional',
        position: p.position,
        specificPosition: p.specificPosition || p.position,
        peakOvr: p.overall,
        era: `Temp. ${p.recruitedYear || 2026} - ${p.contractEndSeason || 2030}`,
        clubs: 'Club de la Liga',
        trophies: '⭐ Leyenda Retirada de tu Partida',
        careerGoals: p.stats?.goals || 0,
        careerAssists: p.stats?.assists || 0,
        careerApps: p.stats?.gamesPlayed || 0,
        bio: `Jugador retirado con honores en esta liga. Peak OVR alcanzado: ${p.overall}.`,
        isCustomRetired: true
      }));

      setCustomLegends(converted);
    }
    loadCustomHof();
  }, [leagueId]);

  const allLegends = [...customLegends, ...ALL_TIME_LEGENDS];

  const filteredLegends = allLegends.filter(l => {
    const matchPos = filterPos === 'ALL' || l.position === filterPos;
    const matchQuery = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       l.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       l.clubs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPos && matchQuery;
  });

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Header */}
      <div className="page-header" style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.2)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#fbbf24', margin: 0 }}>
              <Trophy size={32} color="#fbbf24" /> Salón de la Fama de Leyendas del Fútbol
            </h1>
            <p style={{ color: '#94a3b8', margin: '6px 0 0 0', fontSize: '0.92rem' }}>
              El santuario de los más grandes mitos de la historia del balompié mundial y las leyendas retiradas de tu liga.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(251, 191, 36, 0.1)', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
            <Star size={18} color="#fbbf24" fill="#fbbf24" />
            <strong style={{ color: '#fbbf24', fontSize: '0.9rem' }}>{allLegends.length} Leyendas Consagradas</strong>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: 'Todas las Posiciones' },
            { id: 'DEL', label: 'Delanteros (DC/EXT)' },
            { id: 'MED', label: 'Centrocampistas' },
            { id: 'DEF', label: 'Defensas' },
            { id: 'POR', label: 'Porteros' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setFilterPos(p.id as any)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: filterPos === p.id ? '1px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
                background: filterPos === p.id ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: filterPos === p.id ? '#fbbf24' : '#cbd5e1',
                fontWeight: 'bold',
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '260px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
          <input
            type="text"
            placeholder="Buscar por leyenda, país o club..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bb-input"
            style={{ paddingLeft: '32px', width: '100%', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Legends Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.25rem'
      }}>
        {filteredLegends.map(l => (
          <div
            key={l.id}
            className="glass-panel"
            style={{
              padding: '1.25rem',
              borderRadius: '12px',
              border: l.isCustomRetired ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(251, 191, 36, 0.3)',
              background: l.isCustomRetired
                ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.08), rgba(15, 23, 42, 0.9))'
                : 'linear-gradient(145deg, rgba(251, 191, 36, 0.06), rgba(15, 23, 42, 0.9))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div>
              {/* Header: Position badge, Country & Peak OVR */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    backgroundColor: l.position === 'DEL' ? 'rgba(239, 68, 68, 0.25)' :
                                     l.position === 'MED' ? 'rgba(16, 185, 129, 0.25)' :
                                     l.position === 'DEF' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(234, 179, 8, 0.25)',
                    color: l.position === 'DEL' ? '#f87171' :
                           l.position === 'MED' ? '#34d399' :
                           l.position === 'DEF' ? '#60a5fa' : '#fde047'
                  }}>
                    {l.specificPosition || l.position}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {l.country} • {l.era}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(251, 191, 36, 0.15)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(251, 191, 36, 0.4)'
                }}>
                  <Star size={13} color="#fbbf24" fill="#fbbf24" />
                  <span style={{ fontSize: '0.7rem', color: '#fbbf24', textTransform: 'uppercase' }}>PEAK</span>
                  <strong style={{ fontSize: '1.05rem', color: '#fbbf24' }}>{l.peakOvr}</strong>
                </div>
              </div>

              {/* Player Name */}
              <h3 style={{ margin: '0 0 0.4rem 0', color: '#f8fafc', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{l.name}</span>
                {l.isCustomRetired && <span style={{ fontSize: '0.7rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 6px', borderRadius: '4px' }}>Cantera/Liga</span>}
              </h3>

              <div style={{ fontSize: '0.82rem', color: '#38bdf8', marginBottom: '0.75rem', fontWeight: 500 }}>
                🏟️ {l.clubs}
              </div>

              {/* Trophies */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '8px 10px',
                borderRadius: '8px',
                marginBottom: '0.75rem',
                fontSize: '0.8rem',
                color: '#e2e8f0',
                borderLeft: '3px solid #fbbf24'
              }}>
                {l.trophies}
              </div>

              {/* Bio summary */}
              <p style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.82rem', lineHeight: '1.35' }}>
                {l.bio}
              </p>
            </div>

            {/* Career Stats Pills */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '0.75rem',
              textAlign: 'center'
            }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '6px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Partidos</div>
                <strong style={{ fontSize: '0.95rem', color: '#f1f5f9' }}>{l.careerApps}</strong>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '6px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Goles</div>
                <strong style={{ fontSize: '0.95rem', color: '#10b981' }}>{l.careerGoals}</strong>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '6px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Asistencias</div>
                <strong style={{ fontSize: '0.95rem', color: '#38bdf8' }}>{l.careerAssists}</strong>
              </div>
            </div>
          </div>
        ))}

        {filteredLegends.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            No se encontraron leyendas con los filtros seleccionados.
          </div>
        )}
      </div>
    </div>
  );
}
