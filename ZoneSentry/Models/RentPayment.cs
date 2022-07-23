namespace ZoneSentry.Models;

public class RentPayment
{
    public int Id { get; set; }
    
    public int Payment { get; set; }
    public PaymentState PaymentState { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
    
    public RentAgreement RentAgreement { get; set; }
}

