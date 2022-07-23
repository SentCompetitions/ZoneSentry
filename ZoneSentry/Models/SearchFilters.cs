namespace ZoneSentry.Models;

public class SearchFilters
{
    public RealtyStatus? RealtyStatus { get; set; }
    public string? City { get; set; }
    
    public int? AreaMin { get; set; }
    public int? AreaMax { get; set; }
    public int? PriceMin { get; set; }
    public int? PriceMax { get; set; }
}