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
    public async Task<ActionResult<Plant>> SetPlantDivision(long plantId, long plantOriginId, long plantDivisionId, long plantVegetableReignId,
        long plantClassId, long plantFamilyId, long plantGenreId, long plantSpeciesId ,long plantPartId)
    {
        var plant = Context.PlantData.Find(plantId);
        var division = Context.PlantDivisionData.Find(plantDivisionId);
        var plantOrigin = Context.PlantOriginData.Find(plantOriginId);
        var vegetableReign = Context.VegetableReignData.Find(plantVegetableReignId);
        
        
        var plantClass = Context.PlantClassData.Find(plantClassId);
        var plantFamily = Context.PlantFamilyData.Find(plantFamilyId);
        var plantGenre = Context.PlantGenreData.Find(plantGenreId);
        var plantSpecies = Context.PlantSpeciesData.Find(plantSpeciesId);
        var plantPart = Context.PlantPartData.Find(plantPartId);

        if (plant == null)
        {
            new JsonResult(new { error = "Cannot be found!" });  
        }
        
        if (plantOrigin == null)
        {
            new JsonResult(new { error = "Origin  cannot be found!" });  
        }
        
        if (division == null)
        {
            new JsonResult(new { error = "DivisionId cannot be found!" });  
        }
        
        if (vegetableReign == null)
        {
            new JsonResult(new { error = "VegetableReign cannot be found!" });  
        }
        
        
        if (plantClass == null)
        {
            new JsonResult(new { error = "plantClass cannot be found!" });  
        }
        
        if (plantFamily == null)
        {
            new JsonResult(new { error = "plantFamily cannot be found!" });  
        }
        
        if (plantGenre == null)
        {
            new JsonResult(new { error = "plantGenre cannot be found!" });  
        }
        
        if (plantSpecies == null)
        {
            new JsonResult(new { error = "plantSpecies cannot be found!" });  
        }
        
        if (plantPart == null)
        {
            new JsonResult(new { error = "plantPart cannot be found!" });  
        }
        
 
        plant.PlantDivisionId = plantDivisionId;
        plant.OriginId = plantOriginId;
        plant.VegetableReignId = plantVegetableReignId; 
        
        plant.PlantClassId = plantClassId; 
        plant.PlantFamilyId = plantFamilyId; 
        plant.PlantGenreId = plantGenreId; 
        plant.PlantSpeciesId = plantSpeciesId; 
        plant.UsedPartId = plantPartId; 
        
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

    [HttpPost]
    [Route("AddContraindication")]
    public async Task<ActionResult<Plant>> AddContraindication(string name)
    {
        var newObject = Context.PlantContraindicationData.Add(new PlantContraindication { Name = name }).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newObject).Value);
    }

    [HttpPost]
    [Route("AddContraindicationEntry")]
    public async Task<ActionResult<Plant>> AddContraindicationEntry(int plantId, int contraindicationId)
    {
        var entryList = Context.PlantContraindicationEntryData.Where(entry =>
            entry.PlantId == plantId && entry.PlantContraindicationId == contraindicationId);

        var plantList = Context.PlantData.Where(plant => plant.PlantId == plantId);
        var contraindicationList =
            Context.PlantContraindicationData.Where(contraindication => contraindication.PlantContraindicationId == contraindicationId);

        bool alreadyExists = entryList != null && entryList.Count() > 0;
        bool PlantDoesNotExist = plantList == null || plantList.Count() == 0;
        bool contraindicationDoesNotExist = contraindicationList == null || contraindicationList.Count() == 0;

        if (alreadyExists)
        {
            HttpContext.Response.StatusCode = 500;
            return new JsonResult(new { error = "Entry already exists!" });
        }

        if (PlantDoesNotExist)
        {
            HttpContext.Response.StatusCode = 500;
            return new JsonResult(new { error = "Plant does not exist!" });
        }

        if (contraindicationDoesNotExist)
        {
            HttpContext.Response.StatusCode = 500;
            return new JsonResult(new { error = "Contraindication does not exist!" });
        }

        var newObject = Context.PlantContraindicationEntryData.Add(new PlantContraindicationEntry
        {
            PlantId = plantId,
            PlantContraindicationId = contraindicationId
        }).Entity;

        await Context.SaveChangesAsync();
        return Ok(Json(newObject).Value);
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
        var list = await Context.PlantData.Where(plant => !plant.Removed).Skip(offset).Take(limit).ToListAsync();
        return Ok(await PlantData.ToList(list, Context));
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<Plant>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await PlantData.ToList(await Context.PlantData.Skip(offset).Take(limit).ToListAsync(), Context));
        }
        else
        {
            return Ok(await PlantData.ToList(await Context.PlantData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
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
                .Where(plant => !plant.Removed && plant.CommonName.ToLower().Contains(commonNameLike.ToLower())).Skip(offset).Take(limit)
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
                .Where(plant => !plant.Removed && plant.ArabicName.ToLower().Contains(arabicNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync(), Context));
        }
    }
}