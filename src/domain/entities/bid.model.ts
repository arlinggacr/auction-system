export class Bid {
  constructor(
    public id: number,
    public amount: number,
    public timestamp: Date,
    public auctionId: number,
  ) {}
}
