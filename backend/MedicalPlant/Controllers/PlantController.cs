using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Model;

namespace Controllers;


[Route("api/[controller]")]
public class PlantController : Controller
{
    DataContext Context;

    public PlantController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<Plant>> Add(string latinName, string commonName, string arabicName)
    {
        if (latinName == null)
        {
            latinName = "";
        }

        if (commonName == null)
        {
            commonName = "";
        }

        if (arabicName == null)
        {
            arabicName = "";
        }

        var list = await Context.PlantData.Where(plant => plant.LatinName.ToLower().Equals(latinName.ToLower())).ToListAsync();
        if (list != null && list.Count > 0)
        {
            HttpContext.Response.StatusCode = 500;
            return new JsonResult(new { error = "Entry already exists!" });
        }
        var newPlant = Context.PlantData.Add(new Plant { LatinName = latinName, CommonName = commonName, ArabicName = arabicName}).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newPlant).Value);
    }
    
    [HttpPost]
    [Route("SetOrigin")]
    public async Task<ActionResult<Plant>> SetOrigin(long plantId, long originId)
    {
        var plant = Context.PlantData.Find(plantId);
        var origin = Context.PlantOriginData.Find(originId);
        if (plant != null && origin != null)
        {
            plant.OriginId = originId;
            await Context.SaveChangesAsync();
            return Ok(Json(plant).Value);
        }
        
        return new JsonResult(new { error = "Cannot be found!" });   
    }
    
    [HttpPost]
    [Route("SetVegetableReign")]
    public async Task<ActionResult<Plant>> SetVegetableReign(long plantId, long vegetableReignId)
    {
        var plant = Context.PlantData.Find(plantId);
        var reign = Context.VegetableReignData.Find(vegetableReignId);
        if (plant != null && reign != null)
        {
            plant.VegetableReignId = vegetableReignId;
            await Context.SaveChangesAsync();
            return Ok(Json(plant).Value);
        }
        
        return new JsonResult(new { error = "Cannot be found!" });   
    }
    
    [HttpPost]
    [Route("SetPlantDivision")]
    public async Task<ActionResult<Plant>> SetPlantDivision(long plantId, long plantDivisionId)
    {
        var plant = Context.PlantData.Find(plantId);
        var division = Context.PlantDivisionData.Find(plantDivisionId);
        if (plant != null && division != null)
        {
            plant.PlantDivisionId = plantDivisionId;
            await Context.SaveChangesAsync();
            return Ok(Json(plant).Value);
        }
        
        return new JsonResult(new { error = "Cannot be found!" });   
    }
    
    [HttpPost]
    [Route("Update")]
    public async Task<ActionResult<Plant>> Update(long plantId, string latinName, string commonName, string arabicName, long plantOriginId, long plantDivisionId, long plantVegetableReignId,
        long plantClassId, long plantFamilyId, long plantGenreId, long plantSpeciesId ,long plantPartId, 
        string plantContraindicationList, string plantConstituentList,
        string plantEffectList, string plantNegativeEffectList, string plantIndicationList)
    {

        List<int> plantContraindicationIds = new List<int>();
        List<int> plantConstituentsIds = new List<int>();
        List<int> plantEffectsIds = new List<int>();
        List<int> plantNegativeEffectsIds = new List<int>();
        List<int> plantIndicationsIds = new List<int>();
        
        if (!string.IsNullOrEmpty(plantContraindicationList))
        {
            // Decode the encoded values
            string decodedIdList = Uri.UnescapeDataString(plantContraindicationList);

            plantContraindicationIds = decodedIdList.Split(',').Select(int.Parse).ToList();
        }
        
        if (!string.IsNullOrEmpty(plantConstituentList))
        {
            // Decode the encoded values
            string decodedIdList = Uri.UnescapeDataString(plantConstituentList);

            plantConstituentsIds = decodedIdList.Split(',').Select(int.Parse).ToList();
        }
        
        if (!string.IsNullOrEmpty(plantEffectList))
        {
            // Decode the encoded values
            string decodedIdList = Uri.UnescapeDataString(plantEffectList);

            plantEffectsIds = decodedIdList.Split(',').Select(int.Parse).ToList();
        }
        
        if (!string.IsNullOrEmpty(plantNegativeEffectList))
        {
            // Decode the encoded values
            string decodedIdList = Uri.UnescapeDataString(plantNegativeEffectList);

            plantNegativeEffectsIds = decodedIdList.Split(',').Select(int.Parse).ToList();
        }
        
        if (!string.IsNullOrEmpty(plantIndicationList))
        {
            // Decode the encoded values
            string decodedIdList = Uri.UnescapeDataString(plantIndicationList);

            plantIndicationsIds = decodedIdList.Split(',').Select(int.Parse).ToList();
        }


        if (latinName == null)
        {
            new JsonResult(new { error = "Latin name cant be null" });  
        }

        if (commonName == null)
        {
            commonName = "";
        }

        if (arabicName == null)
        {
            arabicName = "";
        }
        
        var plant = Context.PlantData.Find(plantId);

        if (plant == null)
        {
            return new JsonResult(new { error = "Cannot be found!" });  
        }


        var contraindicationList = Context.PlantContraindicationEntryData.Where(entry => entry.PlantId == plantId);
        foreach (var element in contraindicationList)
        {
            Context.PlantContraindicationEntryData.Remove(element);
        }
        
        var constituentList = Context.PlantConstituentEntryData.Where(entry => entry.PlantId == plantId);
        foreach (var element in constituentList)
        {
            Context.PlantConstituentEntryData.Remove(element);
        }
        
        var effectList = Context.PlantEffectEntryData.Where(entry => entry.PlantId == plantId);
        foreach (var element in effectList)
        {
            Context.PlantEffectEntryData.Remove(element);
        }
        
        var negativeEffectList = Context.PlantNegativeEffectEntryData.Where(entry => entry.PlantId == plantId);
        foreach (var element in negativeEffectList)
        {
            Context.PlantNegativeEffectEntryData.Remove(element);
        }
        
        var indicationList = Context.PlantIndicationEntryData.Where(entry => entry.PlantId == plantId);
        foreach (var element in indicationList)
        {
            Context.PlantIndicationEntryData.Remove(element);
        }

        plant.LatinName = latinName;
        plant.CommonName = commonName;
        plant.ArabicName = arabicName;
            
        plant.PlantDivisionId = plantDivisionId;
        plant.OriginId = plantOriginId;
        plant.VegetableReignId = plantVegetableReignId; 
        
        plant.PlantClassId = plantClassId; 
        plant.PlantFamilyId = plantFamilyId; 
        plant.PlantGenreId = plantGenreId; 
        plant.PlantSpeciesId = plantSpeciesId; 
        plant.UsedPartId = plantPartId;

        foreach (var contraindicationId in plantContraindicationIds)
        {
            PlantContraindicationEntry entry = new PlantContraindicationEntry
            {
                PlantId = plantId,
                PlantContraindicationId = contraindicationId
            };
            Context.PlantContraindicationEntryData.Add(entry);
        }

        
        foreach (var id in plantConstituentsIds)
        {
            PlantConstituentEntry entry = new PlantConstituentEntry
            {
                PlantId = plantId,
                PlantConstituentId = id
            };
            Context.PlantConstituentEntryData.Add(entry);
        }

        foreach (var id in plantEffectsIds)
        {
            PlantEffectEntry entry = new PlantEffectEntry
            {
                PlantId = plantId,
                PlantEffectId = id
            };
            Context.PlantEffectEntryData.Add(entry);
        }

        foreach (var id in plantNegativeEffectsIds)
        {
            PlantNegativeEffectEntry entry = new PlantNegativeEffectEntry
            {
                PlantId = plantId,
                PlantNegativeEffectId = id
            };
            Context.PlantNegativeEffectEntryData.Add(entry);
        }
        
        
        foreach (var id in plantIndicationsIds)
        {
            PlantIndicationEntry entry = new PlantIndicationEntry
            {
                PlantId = plantId,
                PlantIndicationId = id
            };
            Context.PlantIndicationEntryData.Add(entry);
        }
        
        await Context.SaveChangesAsync();
        return Ok(Json(plant).Value);
            
    }
    
    [HttpPost]
    [Route("Remove")]
    public async Task<ActionResult<Plant>> Remove(long plantId)
    {
        var plant = Context.PlantData.Find(plantId);
        if (plant != null)
        {
            plant.Removed = true;
            await Context.SaveChangesAsync();
            return Ok(Json(plant).Value);
        }
        
        return new JsonResult(new { error = "Cannot be found!" });   
    }


    [HttpGet]
    [Route("Get")]
    public async Task<ActionResult<Plant>> Get(int plantId)
    {
        var newObject = Context.PlantData.Where(plant => plant.PlantId == plantId);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            Plant plant = list[0];

            return Ok(Json(plant).Value);
        }
        else
        {

            HttpContext.Response.StatusCode = 500; 
            return new JsonResult(new { error = "Cannot be found!" });         
        }

    }
    
    [HttpGet]
    [Route("GetAll")]
    public async Task<ActionResult<List<Plant>>> GetAll(int offset, int limit)
    {
        var list = await Context.PlantData.Where(plant => !plant.Removed).Skip(offset).Take(limit).OrderBy(plant => plant.PlantId).ToListAsync();
        return Ok(await PlantData.ToList(list, Context));
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<Plant>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await PlantData.ToList(await Context.PlantData.Where(plant => !plant.Removed).Skip(offset).Take(limit).OrderBy(plant => plant.PlantId).ToListAsync(), Context));
        }
        else
        {
            return Ok(await PlantData.ToList(await Context.PlantData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit).OrderBy(plant => plant.PlantId)
                .ToListAsync(), Context));
        }
    }
    
    [HttpGet]
    [Route("GetAllByCommonName")]
    public async Task<ActionResult<List<Plant>>> GetAllByCommonName(int offset, int limit, string commonNameLike)
    {
        if (string.IsNullOrEmpty(commonNameLike))
        {
            return Ok(await PlantData.ToList(await Context.PlantData.Skip(offset).Take(limit).ToListAsync(), Context));
        }
        else
        {
            return Ok(await PlantData.ToList(await Context.PlantData
                .Where(plant => !plant.Removed && plant.CommonName.ToLower().Contains(commonNameLike.ToLower())).Skip(offset).Take(limit).OrderBy(plant => plant.PlantId)
                .ToListAsync(), Context));
        }
    }
    
    [HttpGet]
    [Route("GetAllByArabicName")]
    public async Task<ActionResult<List<Plant>>> GetAllByArabicName(int offset, int limit, string arabicNameLike)
    {
        if (string.IsNullOrEmpty(arabicNameLike))
        {
            return Ok(await PlantData.ToList(await Context.PlantData.Skip(offset).Take(limit).ToListAsync(), Context));
        }
        else
        {
            return Ok(await PlantData.ToList(await Context.PlantData
                .Where(plant => !plant.Removed && plant.ArabicName.ToLower().Contains(arabicNameLike.ToLower())).Skip(offset).Take(limit).OrderBy(plant => plant.PlantId)
                .ToListAsync(), Context));
        }
    }
}