﻿using AirportFuelManagement.ViewModel;
using AirportFuelManagement.UtilityLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirportFuelManagement.Attribute;

namespace AircraftFuelManagement.Controllers
{
    public class AircraftController : Controller
    {
        [SessionCheck]
        // GET: Aircraft
        public ActionResult AircraftView()
        {
            return View();
        }


        [HttpGet]
        public ActionResult AddAircraftForm()
        {
            var newAircraft = new AirportFuelManagement.ViewModel.AllViewModel.Aircraft();
            return PartialView("_AddAircraftFormView", newAircraft);
        }

        //[HttpPost]
        //public ActionResult AddAircraftForm(string aircraftID)
        //{
        //    var aircraft = AirportBL.GetAircraftById(aircraftID);
        //    return PartialView("_AddAircraftFormView", aircraft);
        //}


        [HttpPost]
        public ActionResult AddAircraftForm(string aircraftID)
        {
            var aircraft = AirportBL.GetAircraftById(aircraftID);
            var airports = AirportBL.GetAirportList();
            ViewBag.AvailableAirports = new SelectList(airports, "AirportID", "AirportName", aircraft);
         //  return Json(aircraft, JsonRequestBehavior.AllowGet);
          return PartialView("_AddAircraftFormView", aircraft);
        }

        [HttpPost]
        public ActionResult AddAircraft(AllViewModel.Aircraft aircraft)
        {
            try
            {
                if (AirportBL.AddAircraft(aircraft))
                {
                    return Json(new { success = true });
                }
                else
                {
                    return Json(new { success = false, message = "Failed to add aircraft. Please try again." });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult UpdateAircraft(AllViewModel.Aircraft aircraft)
        {
            try
            {
                if (AirportBL.UpdateAircraft(aircraft))
                {
                    return Json(new { success = true });
                }
                else
                {
                    return Json(new { success = false, message = "Failed to update aircraft. Please try again." });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public ActionResult GetAllAircrafts(int pageIndex = AircraftConstants.PageIndex, int pageSize = AircraftConstants.PageSize, string sortExpression = AircraftConstants.SortExpression, string sortDirection = AircraftConstants.SortDirection)
        {

            string actualSortDirection = sortDirection.ToUpper() == "DESC" ? "DESC" : "ASC";

            int totalAircraftCount = AirportBL.GetTotalAircraftCount();

            int totalPages = (int)Math.Ceiling((double)totalAircraftCount / pageSize);

            pageIndex = Math.Max(0, Math.Min(pageIndex, totalPages - 1));
            List<AllViewModel.Aircraft> Aircrafts = AirportBL.GetAllAircrafts(sortExpression, actualSortDirection, pageIndex, pageSize);

            var result = new
            {
                Aircrafts = Aircrafts,
                PageIndex = pageIndex,
                TotalPages = totalPages
            };

            return Json(result, JsonRequestBehavior.AllowGet);

        }

    }
}