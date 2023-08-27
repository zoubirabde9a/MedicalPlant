using Data;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class PlantData
{
    public long PlantId { get; set; }
    public string LatinName { get; set; }
    public string CommonName { get; set; }
    public string ArabicName { get; set; }
    public PlantOrigin Origin { get; set; }
    public VegetableReign VegetableReign { get; set; } // Régne
    public PlantDivision PlantDivision { get; set; }
    public PlantClass PlantClass { get; set; }
    public PlantFamily PlantFamily { get; set; }
    public PlantGenre PlantGenre { get; set; }
    public PlantSpecies PlantSpecies { get; set; }
    public PlantPart UsedPart { get; set; }

    public PlantContraindication[] PlantContraindicationList { get; set; }
    public PlantConstituent[] PlantConstituentList { get; set; }
    public PlantEffect[] PlantEffectList { get; set; }
    public PlantNegativeEffect[] PlantNegativeEffectList { get; set; }
    public PlantIndication[] PlantIndicationList { get; set; }

    async public static Task<List<PlantData>> ToList(List<Plant> list, DataContext context)
    {
        List<PlantData> dataList = new List<PlantData>(list.Count);
        foreach (var plant in list)
        {
            dataList.Add(await FromPlant(plant, context));
        }

        return dataList;
    }

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
        
        var plantContraindicationList = await context.PlantContraindicationEntryData
            .Where(entry => entry.PlantId == plant.PlantId).ToListAsync();
        PlantContraindication[] plantContraindicationObjectList = new PlantContraindication[plantContraindicationList.Count];
        for (int i = 0; i < plantContraindicationList.Count; i++)
        {
            var entry = plantContraindicationList[i];
            PlantContraindication plantContraindication = await context.PlantContraindicationData.FindAsync(entry.PlantContraindicationId);
            plantContraindicationObjectList[i] = plantContraindication;
        }
        
        
        var plantConstituentList = await context.PlantConstituentEntryData
            .Where(entry => entry.PlantId == plant.PlantId).ToListAsync();
        PlantConstituent[] plantConstituentObjectList = new PlantConstituent[plantConstituentList.Count];
        for (int i = 0; i < plantConstituentList.Count; i++)
        {
            var entry = plantConstituentList[i];
            PlantConstituent plantConstituent = await context.PlantConstituentData.FindAsync(entry.PlantConstituentId);
            plantConstituentObjectList[i] = plantConstituent;
        }
        
        var plantEffectList = await context.PlantEffectEntryData
            .Where(entry => entry.PlantId == plant.PlantId).ToListAsync();
        PlantEffect[] plantEffectObjectList = new PlantEffect[plantEffectList.Count];
        for (int i = 0; i < plantEffectList.Count; i++)
        {
            var entry = plantEffectList[i];
            PlantEffect plantEffect = await context.PlantEffectData.FindAsync(entry.PlantEffectId);
            plantEffectObjectList[i] = plantEffect;
        }
        
        var plantNegativeEffectList = await context.PlantNegativeEffectEntryData
            .Where(entry => entry.PlantId == plant.PlantId).ToListAsync();
        PlantNegativeEffect[] plantNegativeEffectObjectList = new PlantNegativeEffect[plantNegativeEffectList.Count];
        for (int i = 0; i < plantNegativeEffectList.Count; i++)
        {
            var entry = plantNegativeEffectList[i];
            PlantNegativeEffect plantNegativeEffect = await context.PlantNegativeEffectData.FindAsync(entry.PlantNegativeEffectId);
            plantNegativeEffectObjectList[i] = plantNegativeEffect;
        }

        var plantIndicationList = await context.PlantIndicationEntryData
            .Where(entry => entry.PlantId == plant.PlantId).ToListAsync();
        PlantIndication[] plantIndicationObjectList = new PlantIndication[plantIndicationList.Count];
        for (int i = 0; i < plantIndicationList.Count; i++)
        {
            var entry = plantIndicationList[i];
            PlantIndication plantIndication = await context.PlantIndicationData.FindAsync(entry.PlantIndicationId);
            plantIndicationObjectList[i] = plantIndication;
        }
        
        

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
            PlantId = plant.PlantId,
            LatinName = plant.LatinName,
            CommonName = plant.CommonName,
            ArabicName = plant.ArabicName,
            Origin = origin,
            PlantClass = plantClass,
            PlantDivision = plantDevision,
            PlantFamily = plantFamily,
            PlantGenre = plantGenre,
            VegetableReign = vegetableReign,
            PlantSpecies = plantSpecies,
            UsedPart = plantUsedPart,
            PlantContraindicationList = plantContraindicationObjectList,
            PlantConstituentList = plantConstituentObjectList,
            PlantEffectList = plantEffectObjectList,
            PlantNegativeEffectList = plantNegativeEffectObjectList,
            PlantIndicationList = plantIndicationObjectList
            
        };
    }
}