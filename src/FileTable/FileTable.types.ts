export interface ITableHeadsConfig {
  order: string[];
  map: {
    [key: string]: { name: string; dir: string };
  };
}
