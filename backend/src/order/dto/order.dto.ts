export class CreateOrderDto {
  customerName: string;
  ticketsCount: number;
  filmId: string;
  sessionId: string;
  seats?: string[];
}
