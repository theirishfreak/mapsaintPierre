import { useState, useCallback } from 'react'

export type TimeOfDay = 'day' | 'dusk' | 'night' | 'midnight'

export interface TimeState {
  hour: number
  timeOfDay: TimeOfDay
  sunIntensity: number
  moonIntensity: number
  ambientIntensity: number
  skyColor: string
  lanternsOn: boolean
  fogDensity: number
}

function classify(hour: number): TimeOfDay {
  if (hour >= 10 && hour < 18) return 'day'
  if (hour >= 18 && hour < 21) return 'dusk'
  if (hour >= 21 && hour < 23) return 'night'
  return 'midnight'
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function buildState(hour: number): TimeState {
  const timeOfDay = classify(hour)

  let sunIntensity = 0
  let moonIntensity = 0
  let ambientIntensity = 0
  let skyColor = '#0a1428'
  let lanternsOn = false
  let fogDensity = 0

  if (hour >= 10 && hour < 18) {
    const t = (hour - 10) / 8
    sunIntensity = t < 0.5 ? lerp(1.5, 2.5, t * 2) : lerp(2.5, 0.8, (t - 0.5) * 2)
    ambientIntensity = 0.6
    skyColor = '#87ceeb'
    lanternsOn = false
    fogDensity = 0
  } else if (hour >= 18 && hour < 21) {
    const t = (hour - 18) / 3
    sunIntensity = lerp(0.8, 0, t)
    moonIntensity = lerp(0, 0.15, t)
    ambientIntensity = lerp(0.6, 0.08, t)
    skyColor = t < 0.5 ? '#e8763a' : '#2d1b4e'
    lanternsOn = t > 0.5
    fogDensity = lerp(0, 0.002, t)
  } else if (hour >= 21 && hour < 23) {
    const t = (hour - 21) / 2
    moonIntensity = lerp(0.15, 0.25, t)
    ambientIntensity = 0.08
    skyColor = '#0a1428'
    lanternsOn = true
    fogDensity = 0.003
  } else {
    moonIntensity = 0.25
    ambientIntensity = 0.05
    skyColor = '#050c1a'
    lanternsOn = true
    fogDensity = 0.004
  }

  return { hour, timeOfDay, sunIntensity, moonIntensity, ambientIntensity, skyColor, lanternsOn, fogDensity }
}

export function useTimeOfDay(initialHour = 23) {
  const [hour, setHour] = useState(initialHour)
  const state = buildState(hour)

  const setTime = useCallback((h: number) => {
    setHour(Math.max(10, Math.min(24, h)))
  }, [])

  return { ...state, setTime }
}
