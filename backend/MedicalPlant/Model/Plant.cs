namespace Model;

public class Plant
{
    public long PlantId { get; set; }
    public string LatinName { get; set; }
    public string CommonName { get; set; }
    public string ArabicName { get; set; }
    public int OriginId { get; set; }
    public int VegetableReignId { get; set; } // Régne
    public int PlantDivisionId { get; set; }
    public int PlantClassId { get; set; }
    public int PlantFamilyId { get; set; }
    public int PlantGenreId { get; set; }
    public int PlantSpeciesId { get; set; }
    public int UsedPartId { get; set; }
    
    // Upon removal of plants, we keep them in the database
    // With Removed boolean set to true
    public bool Removed { get; set; }
}