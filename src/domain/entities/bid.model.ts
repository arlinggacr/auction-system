export class Bid {
  constructor(
    public id: string,
    public amount: number,
    public timestamp: Date,
    public auctionId: string,
  ) {}
}
