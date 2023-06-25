using Data;

namespace Model;

public class PlantData
{
    public string LatinName { get; set; }
    public string CommonName { get; set; }
    public string ArabicName { get; set; }
    public string Origin { get; set; }
    public string VegetableReign { get; set; } // Régne
    public string PlantDivision { get; set; }
    public string PlantClass { get; set; }
    public string PlantFamily { get; set; }
    public string PlantGenre { get; set; }
    public string PlantSpecies { get; set; }
    public string UsedPart { get; set; }

    async public static Task<PlantData> FromPlant(Plant plant, DataContext context)
    {
        var origin = await context.PlantOriginData.FindAsync(plant.OriginId);
        var plantClass = await context.PlantClassData.FindAsync(plant.PlantClassId);
        var plantDevision = await context.PlantDivisionData.FindAsync(plant.PlantDivisionId);
        var plantFamily = await context.PlantFamilyData.FindAsync(plant.PlantFamilyId);
        var plantGenre = await context.PlantGenreData.FindAsync(plant.PlantGenreId);
        var vegetableReign = await context.VegetableReignData.FindAsync(plant.VegetableReignId);
        var plantSpecies = await context.PlantSpeciesData.FindAsync(plant.PlantSpeciesId);
        var plantUsedPart = await context.PlantPartData.FindAsync(plant.UsedPartId);

        origin = origin == null ? new PlantOrigin() : origin;
        plantClass = plantClass == null ? new PlantClass() : plantClass;
        plantDevision = plantDevision == null ? new PlantDivision() : plantDevision;
        plantFamily = plantFamily == null ? new PlantFamily() : plantFamily;
        plantGenre = plantGenre == null ? new PlantGenre() : plantGenre;
        vegetableReign = vegetableReign == null ? new VegetableReign() : vegetableReign;
        plantSpecies = plantSpecies == null ? new PlantSpecies() : plantSpecies;
        plantUsedPart = plantUsedPart == null ? new PlantPart() : plantUsedPart;

        return new PlantData
        {
            LatinName = plant.LatinName,
            CommonName = plant.CommonName,
            ArabicName = plant.ArabicName,
            Origin = origin.LatinName,
            PlantClass = plantClass.LatinName,
            PlantDivision = plantDevision.LatinName,
            PlantFamily = plantFamily.LatinName,
            PlantGenre = plantGenre.LatinName,
            VegetableReign = vegetableReign.LatinName,
            PlantSpecies = plantSpecies.LatinName,
            UsedPart = plantUsedPart.LatinName
        };
    }
}