
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
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
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
      " pd.policy_id as `policyID`," +
      " DATE_FORMAT(pd.date_of_purchase, GET_FORMAT(DATE, 'ISO')) as `dateOfPurchase`," +
      " pd.customer_id as `customerID`," +
      " pd.fuel as `fuel`," +
      " pd.vehicle_segment as `vehicleSegment`," +
      " pd.premium as `premium`," +
      " pd.bodily_injury_liability as `bodilyInjuryLiability`," +
      " pd.personal_injury_protection as `personalInjuryProtection`," +
      " pd.property_damage_liability as `propertyDamageLiability`," +
      " pd.collision as `collision`," +
      " pd.comprehensive as `comprehensive`," +
      " pd.income_group as `incomeGroup`," +
      " pd.marital_status as `maritalStatus`," +
      " ud.gender as `gender`," +
      " ud.region as `region`" +
      " from policy_details pd" +
      " join user_details ud on ud.customer_id = pd.customer_id" +
      " where pd.policy_id = ?";

    let params = [searchKey];

    queryHandler(req.app.get('dbRead'), query, params)
      .then(response => {
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