import { FlatList, Text } from "react-native";
const SongList = ({ tracks }) => {
  return (
    <FlatList
      data={tracks}
      renderItem={({ item }) => {
        console.log(item);
        return <Text style={{ color: "white" }}>{item.songTitle}</Text>;
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

export default SongList;
