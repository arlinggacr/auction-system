export class Bid {
  constructor(
    public id: string,
    public amount: number,
    public createdAt: Date,
    public auctionId?: string,
  ) {}
}
