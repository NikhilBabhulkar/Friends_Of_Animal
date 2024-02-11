import { generateCertificate } from "../middleware/CertificateGenration.js";
import { sendParticipationMail } from "../middleware/Email.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

/* Create a Event */
export const createEvent = async (req, res) => {
    try {
        const { eventName, description, eventPosterUrl, startdate, deadline } = req.body;
        const newEvent = new Event({
            eventName,
            description,
            eventPosterUrl,
            startdate,
            deadline
        });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

/* Read  */

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({ completed: false });
        res.status(200).json(events)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getLatestEvent = async (req, res) => {
    try {
        // Find the latest record by sorting in descending order and limiting to 1 result
        const latestEvent = await Event.findOne().sort({ createdAt: -1 }).exec();
        res.status(200).json(latestEvent);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/* Update */

export const participate = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const event = await Event.findById(id);
        const user = await User.findById(userId);
        event.participants.push(userId);
        user.events.push(id);
        await event.save();
        await user.save();
        let data = {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            event: event.eventName,
            description: event.description,
            startdate: event.startdate,
            enddate: event.deadline
        }
        sendParticipationMail(data);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
    }
};

/* genrate  participation certificates for events */
export const participationCertificateGenration = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        const users = await Promise.all(event.participants.map(async (userId) => {
            const user = await User.findById(userId);
            const data = {
                userId, "participantName": `${user.firstName} ${user.lastName}`, "eventName": event.eventName, "eventId": event._id
            }
            generateCertificate(data);

        }));
        res.status(200).json({ message: "Certificate Genrated" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in Server" })
    }





}
