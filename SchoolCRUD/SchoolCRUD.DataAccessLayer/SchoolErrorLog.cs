//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SchoolCRUD.DataAccessLayer
{
    using System;
    using System.Collections.Generic;
    
    public partial class SchoolErrorLog
    {
        public int LogId { get; set; }
        public Nullable<System.DateTime> Timestamp { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public string Source { get; set; }
        public string TargetSite { get; set; }
    }
}