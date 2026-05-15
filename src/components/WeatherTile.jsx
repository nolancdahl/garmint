import React, { useState, useEffect } from 'react'
import { COLORS, FONTS } from '../lib/theme'

const weatherCodeMap = (code) => {
  if (code === 0) return { emoji: '☀️', desc: 'Clear and sunny' }
  if (code === 1) return { emoji: '🌤️', desc: 'Mainly clear' }
  if (code === 2) return { emoji: '⛅', desc: 'Partly cloudy' }
  if (code === 3) return { emoji: '☁️', desc: 'Overcast' }
  if (code <= 48) return { emoji: '🌫️', desc: 'Foggy' }
  if (code <= 57) return { emoji: '🌦️', desc: 'Light drizzle' }
  if (code <= 65) return { emoji: '🌧️', desc: 'Rainy' }
  if (code <= 67) return { emoji: '🌧️', desc: 'Freezing rain' }
  if (code <= 77) return { emoji: '🌨️', desc: 'Snowy' }
  if (code <= 82) return { emoji: '🌦️', desc: 'Showers' }
  if (code <= 86) return { emoji: '🌨️', desc: 'Snow showers' }
  if (code >= 95) return { emoji: '⛈️', desc: 'Thunderstorms' }
  return { emoji: '🌡️', desc: '—' }
}

const formatHour = (timeStr) => {
  const d = new Date(timeStr)
  let h = d.getHours()
  const ampm = h >= 12 ? 'pm' : 'am'
  h = h % 12
  if (h === 0) h = 12
  return `${h}${ampm}`
}

const dayLabel = (dateStr) => {
  const d = new Date(dateStr + 'T12:00:00')
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]
}

const buildRecommendation = (temp, code, rain) => {
  let opener = ''
  let outfit = ''
  let weatherNote = ''

  if (temp < 45) {
    opener = 'Cold one.'
    outfit = 'Heavy wool sweater, flannel trousers, a topcoat, and a scarf'
  } else if (temp < 55) {
    opener = 'Crisp and cool.'
    outfit = 'A fine-gauge wool crewneck over a button-down with wool flannel trousers'
  } else if (temp < 65) {
    opener = 'Classic mild Seattle.'
    outfit = "A button-down on its own or a lightweight knit with chinos. Light layer if you'll be out late"
  } else if (temp < 72) {
    opener = 'Edging warm.'
    outfit = 'Linen-blend button-down or a cotton knit polo with breathable chinos. Skip the layer'
  } else if (temp < 78) {
    opener = 'Warm.'
    outfit = 'Reach for your lightest fabrics. Linen shirt or a thin cotton tee with airy trousers. Pick shoes that breathe'
  } else {
    opener = 'Hot for Seattle.'
    outfit = 'Stay light. Linen or thin cotton, loose cut. Hydrate and look for shade'
  }

  if (rain >= 70) weatherNote = " Heavy rain likely. Don't skip the rain shell."
  else if (rain >= 40) weatherNote = ` ${rain}% rain chance. A water-resistant layer is worth carrying.`
  else if (rain >= 20) weatherNote = ` Slim chance of showers (${rain}%).`

  return `${opener} ${outfit}.${weatherNote}`
}

export const WeatherTile = () => {
  const [data, setData] = useState(null)
  const [err, setErr] = useState(false)

  useEffect(() => {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=47.6062&longitude=-122.3321&current=temperature_2m,weather_code,precipitation_probability&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&timezone=auto&forecast_days=8'
    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setErr(true))
  }, [])

  if (err)
    return (
      <div className="tile" style={{ padding: '20px', color: COLORS.textMuted, fontStyle: 'italic', fontSize: '13px', textAlign: 'center' }}>
        Weather unavailable
      </div>
    )

  if (!data)
    return (
      <div className="tile" style={{ padding: '20px', color: COLORS.textFaint, fontSize: '13px', textAlign: 'center' }}>
        Loading the sky…
      </div>
    )

  const currentTemp = Math.round(data.current.temperature_2m)
  const currentInfo = weatherCodeMap(data.current.weather_code)
  const todayHigh = Math.round(data.daily.temperature_2m_max[0])
  const todayLow = Math.round(data.daily.temperature_2m_min[0])
  const todayRain = data.daily.precipitation_probability_max[0]
  const recommendation = buildRecommendation(currentTemp, data.current.weather_code, todayRain)

  // 24 hourly entries starting from current
  const now = new Date()
  const hourlyTimes = data.hourly.time
  let startIdx = hourlyTimes.findIndex((t) => new Date(t).getTime() > now.getTime() - 30 * 60 * 1000)
  if (startIdx < 0) startIdx = 0
  const hourly = Array.from({ length: 24 }, (_, i) => {
    const idx = startIdx + i
    return {
      time: hourlyTimes[idx],
      emoji: weatherCodeMap(data.hourly.weather_code[idx]).emoji,
      temp: Math.round(data.hourly.temperature_2m[idx]),
      rain: data.hourly.precipitation_probability[idx],
    }
  })

  // 7 days (today + next 6)
  const daily = data.daily.time.slice(0, 7).map((dateStr, i) => ({
    day: i === 0 ? 'Today' : dayLabel(dateStr),
    emoji: weatherCodeMap(data.daily.weather_code[i]).emoji,
    high: Math.round(data.daily.temperature_2m_max[i]),
    rain: data.daily.precipitation_probability_max[i],
  }))

  return (
    <div className="tile" style={{ padding: '18px 20px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{ fontSize: '40px', lineHeight: 1 }}>{currentInfo.emoji}</div>
          <div>
            <div className="title-bold" style={{ fontSize: '30px', color: COLORS.green, lineHeight: 1 }}>
              {currentTemp}°
            </div>
            <div style={{ fontFamily: FONTS.sub, fontSize: '11.5px', color: COLORS.text, marginTop: '4px', fontWeight: 500 }}>
              {currentInfo.desc}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '8px', fontFamily: FONTS.sub, fontSize: '11.5px', color: COLORS.textMuted, flexWrap: 'wrap' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>Seattle</span>
            <span style={{ color: COLORS.textFaint }}>·</span>
            <span>H {todayHigh}° L {todayLow}°</span>
            <span style={{ color: COLORS.textFaint }}>·</span>
            <span>🌧 {todayRain}% today</span>
          </div>
          <div style={{ fontFamily: FONTS.sub, fontSize: '12.5px', lineHeight: 1.5, color: COLORS.text, marginTop: '8px' }}>
            {recommendation}
          </div>
        </div>
      </div>

      <div style={{ height: '1px', background: COLORS.greenLineSoft, margin: '14px 0 12px' }} />

      <div
        style={{
          fontFamily: FONTS.sub,
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: COLORS.textMuted,
          fontWeight: 600,
          marginBottom: '10px',
        }}
      >
        Next 24 hours
      </div>

      <div className="hide-scrollbar" style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px', margin: '0 -4px' }}>
        {hourly.map((h, i) => (
          <div
            key={i}
            style={{
              flex: '0 0 auto',
              minWidth: '52px',
              textAlign: 'center',
              padding: '8px 4px',
              borderRadius: '4px',
              background: i === 0 ? 'rgba(31, 61, 46, 0.08)' : 'transparent',
            }}
          >
            <div
              style={{
                fontFamily: FONTS.sub,
                fontSize: '10px',
                color: COLORS.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
              }}
            >
              {i === 0 ? 'Now' : formatHour(h.time)}
            </div>
            <div style={{ fontSize: '20px', margin: '4px 0 2px' }}>{h.emoji}</div>
            <div style={{ fontFamily: FONTS.sub, fontSize: '11.5px', color: COLORS.text, fontWeight: 600 }}>
              {h.temp}°
            </div>
            <div
              style={{
                fontFamily: FONTS.sub,
                fontSize: '9.5px',
                color: h.rain >= 40 ? COLORS.green : COLORS.textFaint,
                marginTop: '2px',
                fontWeight: h.rain >= 40 ? 600 : 400,
              }}
            >
              🌧 {h.rain}%
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: '1px', background: COLORS.greenLineSoft, margin: '14px 0 12px' }} />

      <div
        style={{
          fontFamily: FONTS.sub,
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: COLORS.textMuted,
          fontWeight: 600,
          marginBottom: '10px',
        }}
      >
        Week ahead
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {daily.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '6px 2px' }}>
            <div
              style={{
                fontFamily: FONTS.sub,
                fontSize: '9.5px',
                color: COLORS.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
              }}
            >
              {d.day}
            </div>
            <div style={{ fontSize: '18px', margin: '4px 0 2px' }}>{d.emoji}</div>
            <div style={{ fontFamily: FONTS.sub, fontSize: '11px', color: COLORS.text, fontWeight: 600 }}>
              {d.high}°
            </div>
            <div
              style={{
                fontFamily: FONTS.sub,
                fontSize: '9px',
                color: d.rain >= 40 ? COLORS.green : COLORS.textFaint,
                marginTop: '1px',
                fontWeight: d.rain >= 40 ? 600 : 400,
              }}
            >
              🌧 {d.rain}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
