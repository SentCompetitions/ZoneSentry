namespace ZoneSentry.Models;

public class StatsEntry
{
    public string Name { get; set; }
    public List<Point> Points { get; set; }
}

public struct Point
{
    public DateTime X { get; set; }
    public float Y { get; set; }
}