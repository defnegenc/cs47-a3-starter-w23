import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { useSpotifyAuth } from "./utils";
import { Themes } from "./assets/Themes";
import { millisToMinutesAndSeconds } from "./utils/millisToMinutesAndSeconds";
import spotifyLogo from "./assets/spotify-logo.png";

export default function App() {
  // Pass in true to useSpotifyAuth to use the album ID (in env.js) instead of top tracks
  const { token, tracks, getSpotifyAuth } = useSpotifyAuth();

  // Spotify button
  const ConnectWithSpotifyButton = () => (
    <Pressable onPress={getSpotifyAuth} style={styles.connectBtn}>
      <Image source={spotifyLogo} style={styles.logo} />
      <Text style={styles.connectText}>Connect with Spotify</Text>
    </Pressable>
  );

  // Song component
  const Song = ({ item, index }) => (
    <View style={styles.songContainer}>
      <Text style={styles.songIndex}>{index + 1}</Text>
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.albumImage}
        />
      ) : (
        <View style={styles.albumImagePlaceholder} />
      )}
      <View style={styles.songInfo}>
        <Text numberOfLines={1} style={styles.songTitle}>
          {item.songTitle || ""}
        </Text>
        <Text numberOfLines={1} style={styles.songArtist}>
          {Array.isArray(item.songArtists)
            ? item.songArtists.map((artist) => artist.name).join(", ")
            : ""}
        </Text>
      </View>
      <Text style={styles.songAlbum}>{item.albumName || ""}</Text>
      <Text style={styles.songDuration}>
        {item.duration_ms ? millisToMinutesAndSeconds(item.duration_ms) : ""}
      </Text>
    </View>
  );
  
  


  return (
    <SafeAreaView style={styles.container}>
      {token ? (
        <View style={styles.topTracksContainer}>
          <Text style={styles.topTracksTitle}>My Top Tracks</Text>
          <FlatList
            data={tracks}
            renderItem={({ item, index }) => <Song item={item} index={index} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <ConnectWithSpotifyButton />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  connectBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Themes.colors.green,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 99999,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  connectText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  topTracksContainer: {
    flex: 1,
    width: "100%",
  },
  topTracksTitle: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  songContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 3,
    paddingVertical: 8,
  },
  songIndex: {
    color: "#FFF",
    fontSize: 16,
    width: 24,
    textAlign: "right",
    marginRight: 8,
  },
  albumImage: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  songInfo: {
    flex: 1,
    marginRight: 3,
  },
  songTitle: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 4,
  },
  songArtist: {
    color: "#FFF",
    fontSize: 14,
  },
  songAlbum: {
    color: "#FFF",
    fontSize: 14,
    width: 100,
    textAlign: "right",
    marginRight: 0,
  },
  songDuration: {
    color: "#FFF",
    fontSize: 14,
    width: 50,
    textAlign: "right",
  },
});
