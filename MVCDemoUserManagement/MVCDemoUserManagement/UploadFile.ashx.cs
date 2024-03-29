﻿using DemoUserManagement.UtilityLayer;
using System;
using System.Configuration;
using System.IO;
using System.Web;

namespace MVCDemoUserManagement
{
    /// <summary>
    /// Summary description for UploadFile
    /// </summary>
    public class UploadFile : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            if (context.Request.Files.Count > 0)
            {
                HttpPostedFile uploadedFile = context.Request.Files[0];

                string uploadedFileName = UploadFileToServer(uploadedFile);

                if (!string.IsNullOrEmpty(uploadedFileName))
                {

                    string originalFileName = uploadedFile.FileName;
                    context.Response.Write("{\"DiskDocumentName\": \"" + uploadedFileName + "\", \"OriginalFileName\": \"" + originalFileName + "\"}");
                }
                else
                {
                    context.Response.Write("{\"error\": \"Error uploading file.\"}");
                }
            }
            else
            {
                context.Response.Write("{\"error\": \"No file uploaded.\"}");
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public string UploadFileToServer(HttpPostedFile uploadedFile)
        {
            if (uploadedFile != null && uploadedFile.ContentLength > 0)
            {
                try
                {
                    string uploadFolderPath = ConfigurationManager.AppSettings["UploadFolderPath"];

                    string fileName = Path.GetFileName(uploadedFile.FileName);
                    string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(fileName);
                    string filePath = Path.Combine(uploadFolderPath, uniqueFileName);
                    uploadedFile.SaveAs(filePath);
                    return uniqueFileName;
                }
                catch (Exception ex)
                {
                    Logger.AddData(ex);
                    return null;
                }
            }
            return null;
        }
    }
}


