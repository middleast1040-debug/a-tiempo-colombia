import { Route, DepartureCalculation } from '../types/transit';

export function calculateDeparture(
  route: Route,
  originStop: string,
  walkingMinutes: number,
  bufferMinutes: number,
  currentTimeMs: number
): DepartureCalculation {
  const frequency = route.frequencyMinutes || 5;
  const frequencyMs = frequency * 60 * 1000;
  
  // Próxima salida basada en el reloj actual
  const remainderMs = currentTimeMs % frequencyMs;
  const nextBusTimestamp = currentTimeMs + (frequencyMs - remainderMs);
  
  const diffMs = nextBusTimestamp - currentTimeMs;
  const totalBusInMinutes = Math.max(1, Math.ceil(diffMs / (60 * 1000)));
  
  // Tiempo exacto para salir a caminar incluyendo el buffer de seguridad
  const leaveInMinutes = Math.max(0, totalBusInMinutes - walkingMinutes - bufferMinutes);

  let statusText = `Bus en camino (${totalBusInMinutes} min)`;
  let statusColor: 'emerald' | 'amber' | 'red' = 'emerald';

  if (leaveInMinutes === 0) {
    statusText = '¡Sal ahora mismo al andén!';
    statusColor = 'red';
  } else if (leaveInMinutes <= 2) {
    statusText = `Prepara tu salida en ${leaveInMinutes} min`;
    statusColor = 'amber';
  } else {
    statusText = `Sal en ${leaveInMinutes} min para alcanzarlo`;
    statusColor = 'emerald';
  }

  return {
    route,
    originStop,
    walkingMinutes,
    bufferMinutes,
    nextBusTimestamp,
    leaveInMinutes,
    statusText,
    statusColor,
  };
}
