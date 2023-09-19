const DataModel = require('../models/dataModel');

exports.checkPresence = async (req, res) => {
    try {
        const name = req.body.name;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingEntry = await DataModel.findOne({
            name: name,
            timestamp: {
                $gte: today,
                $lt: new Date(today).setDate(today.getDate() + 1)
            }
        });

        if (!existingEntry) {
            const newEntry = new DataModel({
                name: name
            });
            await newEntry.save();
            res.status(200).send('Presence recorded successfully');
        } else {
            res.status(200).send('Presence already recorded for today');
        }
    } catch (error) {
        res.status(500).send('Error recording presence');
    }
};
