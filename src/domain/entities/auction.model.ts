export class Auction {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public startPrice: number,
    public currentPrice: number,
    public endTime: Date,
  ) {}

  placeBid(amount: number) {
    if (amount > this.currentPrice) {
      this.currentPrice = amount;
    }
  }
}
