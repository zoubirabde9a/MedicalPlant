namespace Model;

public class PlantNegativeEffect
{
    public long PlantNegativeEffectId { get; set; }
    public string LatinName { get; set; } = "";

    // Upon removal of plants, we keep them in the database
    // With Removed boolean set to true
    public bool Removed { get; set; }
}