/* eslint-disable indent */
import { Partidos } from '../types/respuestas-quiz.types';

export const getColoresPartido = (partido: Partidos): string => {
  switch (partido) {
    case 'MC':
      return '#f97b0c';
    case 'MORENA':
      return '#631409';
    case 'PAN':
      return '#1325f2';
    case 'PES':
      return '#7013f2';
    case 'PRD':
      return '#f2cd13';
    case 'PRI':
      return '#ce020f';
    case 'PT':
      return 'linear-gradient(45deg, red, yellow)';
    case 'PVEM':
      return '#4db70b';
    case 'SP':
      return '#0e6051';
    default:
      return 'black';

  }
};