import React from "react";
import { useParams } from "react-router-dom";

export default function RoomPage() {
    const { roomId } = useParams(); // Captures the room name from URL
    const jitsiUrl = `https://meet.jit.si/${roomId}`;

    return (
        <iframe
        src={jitsiUrl}
        style={{ width: "100%", height: "100vh", border: "none" }}
        allow="camera; microphone; fullscreen; display-capture"
        title="Jitsi Video Call"
        />
    );
}