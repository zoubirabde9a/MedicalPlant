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
        return Ok(await Context.PlantData.Where(plant => !plant.Removed).Skip(offset).Take(limit).ToListAsync());
    }
    
    [HttpGet]
    [Route("GetAllByLatinName")]
    public async Task<ActionResult<List<Plant>>> GetAllByLatinName(int offset, int limit, string latinNameLike)
    {
        if (string.IsNullOrEmpty(latinNameLike))
        {
            return Ok(await Context.PlantData.Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantData
                .Where(plant => !plant.Removed && plant.LatinName.ToLower().Contains(latinNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
    
    [HttpGet]
    [Route("GetAllByCommonName")]
    public async Task<ActionResult<List<Plant>>> GetAllByCommonName(int offset, int limit, string commonNameLike)
    {
        if (string.IsNullOrEmpty(commonNameLike))
        {
            return Ok(await Context.PlantData.Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantData
                .Where(plant => !plant.Removed && plant.CommonName.ToLower().Contains(commonNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
    
    [HttpGet]
    [Route("GetAllByArabicName")]
    public async Task<ActionResult<List<Plant>>> GetAllByArabicName(int offset, int limit, string arabicNameLike)
    {
        if (string.IsNullOrEmpty(arabicNameLike))
        {
            return Ok(await Context.PlantData.Skip(offset).Take(limit).ToListAsync());
        }
        else
        {
            return Ok(await Context.PlantData
                .Where(plant => !plant.Removed && plant.ArabicName.ToLower().Contains(arabicNameLike.ToLower())).Skip(offset).Take(limit)
                .ToListAsync());
        }
    }
}