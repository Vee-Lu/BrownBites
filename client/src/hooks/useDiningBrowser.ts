import { useCallback, useEffect, useRef, useState } from 'react'
import { getDiningLocations } from '../services/diningApi'
import { getFoodsByMenuId } from '../services/foodApi'
import { getMenusByDiningLocationId } from '../services/menuApi'
import type { DiningLocation } from '../types/dining'
import type { FoodItem } from '../types/food'
import type { Menu } from '../types/menu'

type LoadStatus = 'idle' | 'loading' | 'ready' | 'error'

function errorMessage(error: unknown, fallback: string): string | null {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return null
  }
  if (error instanceof Error && error.message) {
    return error.message
  }
  return fallback
}

export function useDiningBrowser() {
  const [locations, setLocations] = useState<DiningLocation[]>([])
  const [locationsStatus, setLocationsStatus] = useState<LoadStatus>('loading')
  const [locationsError, setLocationsError] = useState<string | null>(null)
  const [locationReloadKey, setLocationReloadKey] = useState(0)

  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null)
  const [menus, setMenus] = useState<Menu[]>([])
  const [menusStatus, setMenusStatus] = useState<LoadStatus>('idle')
  const [menusError, setMenusError] = useState<string | null>(null)

  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null)
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [foodsStatus, setFoodsStatus] = useState<LoadStatus>('idle')
  const [foodsError, setFoodsError] = useState<string | null>(null)

  const menusAbort = useRef<AbortController | null>(null)
  const foodsAbort = useRef<AbortController | null>(null)
  const selectedLocationIdRef = useRef<number | null>(null)
  const selectedMenuIdRef = useRef<number | null>(null)
  selectedLocationIdRef.current = selectedLocationId
  selectedMenuIdRef.current = selectedMenuId

  const abortMenus = () => {
    menusAbort.current?.abort()
    menusAbort.current = null
  }

  const abortFoods = () => {
    foodsAbort.current?.abort()
    foodsAbort.current = null
  }

  useEffect(() => {
    const controller = new AbortController()
    setLocationsStatus('loading')
    setLocationsError(null)

    let ignore = false

    getDiningLocations(controller.signal)
      .then((data) => {
        if (ignore) {
          return
        }
        setLocations(data)
        setLocationsStatus('ready')
        setSelectedLocationId((current) => {
          if (current !== null && data.some((location) => location.id === current)) {
            return current
          }
          return data[0]?.id ?? null
        })
      })
      .catch((error: unknown) => {
        if (ignore) {
          return
        }
        const message = errorMessage(error, 'Dining locations could not be loaded.')
        if (!message) {
          return
        }
        setLocationsStatus('error')
        setLocationsError(message)
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [locationReloadKey])

  useEffect(() => {
    abortMenus()
    abortFoods()

    if (selectedLocationId === null) {
      setMenus([])
      setMenusStatus('idle')
      setMenusError(null)
      setSelectedMenuId(null)
      setFoods([])
      setFoodsStatus('idle')
      setFoodsError(null)
      return
    }

    const controller = new AbortController()
    menusAbort.current = controller
    let ignore = false
    setMenus([])
    setMenusStatus('loading')
    setMenusError(null)
    setSelectedMenuId(null)
    setFoods([])
    setFoodsStatus('idle')
    setFoodsError(null)

    getMenusByDiningLocationId(selectedLocationId, controller.signal)
      .then((data) => {
        if (ignore) {
          return
        }
        setMenus(data)
        setMenusStatus('ready')
      })
      .catch((error: unknown) => {
        if (ignore) {
          return
        }
        const message = errorMessage(error, 'Menus could not be loaded.')
        if (!message) {
          return
        }
        setMenusStatus('error')
        setMenusError(message)
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [selectedLocationId])

  useEffect(() => {
    abortFoods()

    if (selectedMenuId === null) {
      setFoods([])
      setFoodsStatus('idle')
      setFoodsError(null)
      return
    }

    const controller = new AbortController()
    foodsAbort.current = controller
    let ignore = false
    setFoods([])
    setFoodsStatus('loading')
    setFoodsError(null)

    getFoodsByMenuId(selectedMenuId, controller.signal)
      .then((data) => {
        if (ignore) {
          return
        }
        setFoods(data)
        setFoodsStatus('ready')
      })
      .catch((error: unknown) => {
        if (ignore) {
          return
        }
        const message = errorMessage(error, 'Food items could not be loaded.')
        if (!message) {
          return
        }
        setFoodsStatus('error')
        setFoodsError(message)
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [selectedMenuId])

  const selectLocation = useCallback((id: number) => {
    if (selectedLocationIdRef.current === id) {
      return
    }
    abortMenus()
    abortFoods()
    setSelectedLocationId(id)
    setSelectedMenuId(null)
    setMenus([])
    setMenusStatus('loading')
    setMenusError(null)
    setFoods([])
    setFoodsStatus('idle')
    setFoodsError(null)
  }, [])

  const selectMenu = useCallback((id: number) => {
    if (selectedMenuIdRef.current === id) {
      return
    }
    abortFoods()
    setSelectedMenuId(id)
    setFoods([])
    setFoodsStatus('loading')
    setFoodsError(null)
  }, [])

  const reloadLocations = useCallback(() => {
    setLocationReloadKey((current) => current + 1)
  }, [])

  const selectedLocation = locations.find((location) => location.id === selectedLocationId) ?? null
  const selectedMenu = menus.find((menu) => menu.id === selectedMenuId) ?? null

  return {
    locations,
    locationsStatus,
    locationsError,
    selectedLocation,
    selectLocation,
    reloadLocations,
    menus,
    menusStatus,
    menusError,
    selectedMenu,
    selectMenu,
    foods,
    foodsStatus,
    foodsError,
  }
}
