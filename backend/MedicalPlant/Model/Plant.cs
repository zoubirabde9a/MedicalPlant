namespace Model;

public class Plant
{
    public long PlantId { get; set; }
    public string LatinName { get; set; }
    public string CommonName { get; set; }
    public string ArabicName { get; set; }
    public long OriginId { get; set; }
    public long VegetableReignId { get; set; } // Régne
    public long PlantDivisionId { get; set; }
    public long PlantClassId { get; set; }
    public long PlantFamilyId { get; set; }
    public long PlantGenreId { get; set; }
    public long PlantSpeciesId { get; set; }
    public long UsedPartId { get; set; }
    
    // Upon removal of plants, we keep them in the database
    // With Removed boolean set to true
    public bool Removed { get; set; }
}