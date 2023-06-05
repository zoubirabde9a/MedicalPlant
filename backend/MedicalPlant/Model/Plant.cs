namespace Model;

public class Plant
{
    public long PlantId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public bool Removed { get; set; }

    public ICollection<PlantContraindicationEntry> PlantContraindicationEntries;
}