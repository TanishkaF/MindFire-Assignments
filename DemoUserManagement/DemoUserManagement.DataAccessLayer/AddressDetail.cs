//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DemoUserManagement.DataAccessLayer
{
    using System;
    using System.Collections.Generic;
    
    public partial class AddressDetail
    {
        public int AddressID { get; set; }
        public Nullable<int> UserID { get; set; }
        public Nullable<int> AddressType { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string Pincode { get; set; }
    
        public virtual StudentDetail StudentDetail { get; set; }
    }
}
