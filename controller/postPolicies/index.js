const queryHandler = require('../../handler/database/queryHandler');

let updatePolicy = function (req, res) {
  try {
    console.log("Inside Update Policy");
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("REQ URL: ", fullUrl);

    let data = req.body;

    if (!data.policyId || !data.customerId) {
      console.log("BAD REQUEST, Missing policyId");
      res.status(400).json({ "message": "Bad Request" });
      return;
    }
    let query = 'update policy_details ';
    let params = [];
    let subQuery = [];

    let queryTwo = 'update user_details ';
    let params2 = [];
    let subQueryTwo = [];

    if (data.fuel) {
      subQuery.push('SET fuel = ?');
      params.push(data.fuel);
    }

    if (data.vehicleSegment) {
      subQuery.push('SET vehicle_segment = ?');
      params.push(data.vehicleSegment);
    }

    if (data.premium) {
      subQuery.push('SET premium = ?');
      params.push(data.premium);
    }

    if (data.bodilyInjuryLiability) {
      subQuery.push('SET bodily_injury_liability = ?');
      params.push(data.bodilyInjuryLiability);
    }

    if (data.personalInjuryProtection) {
      subQuery.push('SET personal_injury_protection = ?');
      params.push(data.personalInjuryProtection);
    }

    if (data.propertyDamageLiability) {
      subQuery.push('SET property_damage_liability = ?');
      params.push(data.propertyDamageLiability);
    }

    if (data.collision) {
      subQuery.push('SET collision = ?');
      params.push(data.collision);
    }

    if (data.comprehensive) {
      subQuery.push('SET comprehensive = ?');
      params.push(data.comprehensive);
    }

    if (data.incomeGroup) {
      subQuery.push('SET income_group = ?');
      params.push(data.incomeGroup);
    }

    if (data.maritalStatus) {
      subQuery.push('SET marital_status = ?');
      params.push(data.maritalStatus);
    }

    if (data.gender) {
      subQueryTwo.push('SET gender = ?');
      params2.push(data.gender);
    }

    if (data.region) {
      subQueryTwo.push('SET region = ?');
      params2.push(data.region);
    }

    query = query + subQuery.join(',') + "where policy_id = ?";
    params.push(body.policyId);

    queryTwo = queryTwo + subQueryTwo.join(',') + "where customer_id = ?";
    params2.push(body.customerId);

    queryHandler(req.app.get('dbWrite'), query, params)
      .then(response => {
        return queryHandler(req.app.get('dbWrite'), queryTwo, params2);
      }).then(response => {
        res.status(200).json({ "message": "Data Updated Successfully" });
        return;
      })
      .catch((error) => {
        console.log('Error from database', error)
        res.status(500).json({ error });
        return;
      });

  } catch (error) {
    console.log("Error in update Policy");
    res.status(500).json({ error });
  }
}

module.exports.updatePolicy = updatePolicy;

