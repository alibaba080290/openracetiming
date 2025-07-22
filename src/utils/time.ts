/**
 * Convertit un nombre de millisecondes en chaîne "mm:ss:cc"
 * (cc = centièmes de seconde).
 */
export function fmt(ms: number): string {
  const totalCenti = Math.round(ms / 10); // 1 centième = 10 ms
  const centi = totalCenti % 100;
  const totalSec = Math.floor(totalCenti / 100);
  const sec = totalSec % 60;
  const min = Math.floor(totalSec / 60);

  const pad = (n: number, l = 2) => n.toString().padStart(l, '0');
  return `${pad(min)}:${pad(sec)}:${pad(centi)}`;
}
