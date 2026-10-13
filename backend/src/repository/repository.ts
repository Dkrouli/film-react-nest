export interface Session {
  id: string;
  filmId: string;
  occupiedSeats: string[];
}

export class InMemorySessionRepository {
  private data: Session[] = [];

  constructor() {
    this.data.push({
      id: 'session-123',
      filmId: 'film-456',
      occupiedSeats: ['1:1'],
    });
  }

  findById(id: string): Session | undefined {
    return this.data.find((s) => s.id === id);
  }

  save(session: Session): void {
    const idx = this.data.findIndex((s) => s.id === session.id);
    if (idx !== -1) {
      this.data[idx] = session;
    } else {
      this.data.push(session);
    }
  }
}
