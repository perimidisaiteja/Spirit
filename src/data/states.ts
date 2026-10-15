export interface IndianState {
  code: string;
  name: string;
  type: 'State' | 'UT';
  portalUrl: string;
  capital: string;
  schemeCount: number;
}

export const INDIAN_STATES: IndianState[] = [
  // 28 States
  { code: 'AP', name: 'Andhra Pradesh', type: 'State', portalUrl: 'https://www.ap.gov.in', capital: 'Amaravati', schemeCount: 68 },
  { code: 'AR', name: 'Arunachal Pradesh', type: 'State', portalUrl: 'https://arunachalpradesh.gov.in', capital: 'Itanagar', schemeCount: 28 },
  { code: 'AS', name: 'Assam', type: 'State', portalUrl: 'https://assam.gov.in', capital: 'Dispur', schemeCount: 46 },
  { code: 'BR', name: 'Bihar', type: 'State', portalUrl: 'https://state.bihar.gov.in', capital: 'Patna', schemeCount: 62 },
  { code: 'CG', name: 'Chhattisgarh', type: 'State', portalUrl: 'https://cgstate.gov.in', capital: 'Raipur', schemeCount: 39 },
  { code: 'GA', name: 'Goa', type: 'State', portalUrl: 'https://www.goa.gov.in', capital: 'Panaji', schemeCount: 31 },
  { code: 'GJ', name: 'Gujarat', type: 'State', portalUrl: 'https://gujaratindia.gov.in', capital: 'Gandhinagar', schemeCount: 54 },
  { code: 'HR', name: 'Haryana', type: 'State', portalUrl: 'https://haryana.gov.in', capital: 'Chandigarh', schemeCount: 48 },
  { code: 'HP', name: 'Himachal Pradesh', type: 'State', portalUrl: 'https://himachal.nic.in', capital: 'Shimla', schemeCount: 34 },
  { code: 'JH', name: 'Jharkhand', type: 'State', portalUrl: 'https://www.jharkhand.gov.in', capital: 'Ranchi', schemeCount: 41 },
  { code: 'KA', name: 'Karnataka', type: 'State', portalUrl: 'https://karnataka.gov.in', capital: 'Bengaluru', schemeCount: 72 },
  { code: 'KL', name: 'Kerala', type: 'State', portalUrl: 'https://kerala.gov.in', capital: 'Thiruvananthapuram', schemeCount: 58 },
  { code: 'MP', name: 'Madhya Pradesh', type: 'State', portalUrl: 'https://mp.gov.in', capital: 'Bhopal', schemeCount: 64 },
  { code: 'MH', name: 'Maharashtra', type: 'State', portalUrl: 'https://www.maharashtra.gov.in', capital: 'Mumbai', schemeCount: 82 },
  { code: 'MN', name: 'Manipur', type: 'State', portalUrl: 'https://manipur.gov.in', capital: 'Imphal', schemeCount: 24 },
  { code: 'ML', name: 'Meghalaya', type: 'State', portalUrl: 'https://meghalaya.gov.in', capital: 'Shillong', schemeCount: 22 },
  { code: 'MZ', name: 'Mizoram', type: 'State', portalUrl: 'https://mizoram.gov.in', capital: 'Aizawl', schemeCount: 21 },
  { code: 'NL', name: 'Nagaland', type: 'State', portalUrl: 'https://nagaland.gov.in', capital: 'Kohima', schemeCount: 20 },
  { code: 'OD', name: 'Odisha', type: 'State', portalUrl: 'https://odisha.gov.in', capital: 'Bhubaneswar', schemeCount: 53 },
  { code: 'PB', name: 'Punjab', type: 'State', portalUrl: 'https://punjab.gov.in', capital: 'Chandigarh', schemeCount: 44 },
  { code: 'RJ', name: 'Rajasthan', type: 'State', portalUrl: 'https://rajasthan.gov.in', capital: 'Jaipur', schemeCount: 69 },
  { code: 'SK', name: 'Sikkim', type: 'State', portalUrl: 'https://sikkim.gov.in', capital: 'Gangtok', schemeCount: 19 },
  { code: 'TN', name: 'Tamil Nadu', type: 'State', portalUrl: 'https://www.tn.gov.in', capital: 'Chennai', schemeCount: 79 },
  { code: 'TS', name: 'Telangana', type: 'State', portalUrl: 'https://telangana.gov.in', capital: 'Hyderabad', schemeCount: 74 },
  { code: 'TR', name: 'Tripura', type: 'State', portalUrl: 'https://tripura.gov.in', capital: 'Agartala', schemeCount: 25 },
  { code: 'UP', name: 'Uttar Pradesh', type: 'State', portalUrl: 'https://up.gov.in', capital: 'Lucknow', schemeCount: 96 },
  { code: 'UK', name: 'Uttarakhand', type: 'State', portalUrl: 'https://uk.gov.in', capital: 'Dehradun', schemeCount: 36 },
  { code: 'WB', name: 'West Bengal', type: 'State', portalUrl: 'https://wb.gov.in', capital: 'Kolkata', schemeCount: 67 },

  // 8 Union Territories
  { code: 'AN', name: 'Andaman & Nicobar Islands', type: 'UT', portalUrl: 'https://andaman.gov.in', capital: 'Port Blair', schemeCount: 16 },
  { code: 'CH', name: 'Chandigarh', type: 'UT', portalUrl: 'https://chandigarh.gov.in', capital: 'Chandigarh', schemeCount: 18 },
  { code: 'DN', name: 'Dadra & Nagar Haveli and Daman & Diu', type: 'UT', portalUrl: 'https://daman.nic.in', capital: 'Daman', schemeCount: 14 },
  { code: 'DL', name: 'Delhi (NCT)', type: 'UT', portalUrl: 'https://delhi.gov.in', capital: 'New Delhi', schemeCount: 52 },
  { code: 'JK', name: 'Jammu & Kashmir', type: 'UT', portalUrl: 'https://jk.gov.in', capital: 'Srinagar / Jammu', schemeCount: 37 },
  { code: 'LA', name: 'Ladakh', type: 'UT', portalUrl: 'https://ladakh.nic.in', capital: 'Leh', schemeCount: 17 },
  { code: 'LD', name: 'Lakshadweep', type: 'UT', portalUrl: 'https://lakshadweep.gov.in', capital: 'Kavaratti', schemeCount: 12 },
  { code: 'PY', name: 'Puducherry', type: 'UT', portalUrl: 'https://py.gov.in', capital: 'Puducherry', schemeCount: 22 },
];
