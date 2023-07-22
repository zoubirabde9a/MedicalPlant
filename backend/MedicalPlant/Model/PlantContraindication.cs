namespace Model;

public class PlantContraindication
{
    public long PlantContraindicationId { set; get; }
    public string LatinName { get; set; }

    public bool Removed { get; set; }
}