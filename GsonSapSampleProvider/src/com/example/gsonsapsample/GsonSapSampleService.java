package com.example.gsonsapsample;

import java.io.IOException;

import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import com.doubtech.gear.gsonsapprovider.GenericGsonSapRequest;
import com.doubtech.gear.gsonsapprovider.GsonSapProvider;
import com.doubtech.gear.gsonsapprovider.GsonSapProvider.JsonSapProviderConnection.Requester;
import com.example.gsonsapsample.data.HelloMessage;
import com.example.gsonsapsample.data.UnregisteredMessage;

public class GsonSapSampleService extends GsonSapProvider {
    public static final String TAG = GsonSapSampleService.class.getSimpleName();

    private static final String REQ_INIT_HELLO = "req-initialize";

    public GsonSapSampleService() {
        super(TAG);

        registerTypeAdapter(REQ_INIT_HELLO, HelloMessage.class);
    }

    @Override
    protected void onReceive(Requester requester, Object data) {
        if (data instanceof HelloMessage) {
            HelloMessage message = (HelloMessage) data;
            Toast.makeText(this, message.message, Toast.LENGTH_LONG).show();
            try {
                requester.reply(new HelloMessage("Hello from " + Build.DEVICE));
            } catch (IOException e) {
                Log.e(TAG, e.getMessage());
            }
        }
    }

    @Override
    protected void onReceiveRequest(Requester requester, GenericGsonSapRequest request) {
        // Unidentified messages will appear here as well as any requests
        // registered as GenericGsonSapRequests
    }

    @Override
    protected void onDeviceConnected(String peerId, JsonSapProviderConnection connection) {
        String device = connection.getConnectedPeerAgent().getAccessory().getName();
        try {
            send(new HelloMessage("I see you have connected " + device), peerId);
            send(new HelloMessage(device + " has connected."));
            send(new UnregisteredMessage("This message isn't registered"));
        } catch (IOException e) {
            Log.e(TAG, e.getMessage());
        }
    }

    @Override
    protected void onConnectionLost(String peerId,
            JsonSapProviderConnection connection, int errorCode) {
        Log.d(TAG, errorToString(errorCode));
    }
}
