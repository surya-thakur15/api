
const queryHandler = require('../../handler/database/queryHandler');

let getAllPolicies = function (req, res) {
  try {
    console.log('Inside post function of caller');
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("REQ URL: ", fullUrl);
    let query = `select policy_id as policyId,
                 customer_id as customerId,
                 DATE_FORMAT(date_of_purchase, GET_FORMAT(DATE,'ISO')) as dateOfPurchase,
                 vehicle_segment as vehicleSegment,
                 premium,
                 income_group as incomeGroup
                 from policy_details
                 where is_deleted = 0 limit 5`;
    let params = [];
    queryHandler(req.app.get('dbRead'), query, params)
      .then(response => {
        res.status(200).json({ response });
      })
      .catch((error) => {
        console.log('Error from database', error)
        res.status(500).json({ error });
      });

  } catch (error) {
    console.log("error in getAllPolicies", error);
    res.status(500).json({ error });
  }
}


let getOnePolicy = function (req, res) {
  try {
    console.log("Inside Get One Policy ");
    console.log("REQ URL: ", fullUrl);
    let searchKey;
    if (req.params && req.params.id) {
      searchKey = req.params.id;
    }
    else {
      console.log("BAD REQUEST, Missing policyId");
      res.status(400).json({ "message": "Bad Request" });
      return;
      
    }
    let query = "select" +
      " pd.policy_id as `Policy ID`," +
      " pd.date_of_purchase as `Date of Purchase`," +
      " DATE_FORMAT(pd.customer_id, GET_FORMAT(DATE, 'ISO')) as `Customer ID`," +
      " pd.fuel as `Fuel`," +
      " pd.vehicle_segment as `Vehicle Segment`," +
      " pd.premium as `Premimum`," +
      " pd.bodily_injury_liability as `Bodily Injury Liability`," +
      " pd.personal_injury_protection as `Personal Injury Protection`," +
      " pd.property_damage_liability as `Property Damage Liability`," +
      " pd.collision as `Collision`," +
      " pd.comprehensive as `Comprehensive`," +
      " pd.income_group as `Income Group`," +
      " pd.marital_status as `Marital Status`," +
      " ud.gender as `Gender`," +
      " ud.region as `Region`" +
      " from policy_details pd" +
      " join user_details ud on ud.customer_id = pd.customer_id" +
      " where pd.policy_id = ?";

    let params = [searchKey];

    queryHandler(req.app.get('dbRead'), query, params)
      .then(response => {
        console.log(response, typeof response, JSON.stringify(response));
        res.status(200).json({ response });
      })
      .catch((error) => {
        console.log('Error from database', error)
        res.status(500).json({ error });
        return;
      });
  } catch (error) {
    console.log("error in getOnePolicy", error);
    res.status(500).json({ error });
  }
}

module.exports.getAllPolicies = getAllPolicies;
module.exports.getOnePolicy = getOnePolicy;