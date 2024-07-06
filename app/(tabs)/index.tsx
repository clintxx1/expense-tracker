import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, Divider, Icon } from 'react-native-paper';
import { CustomCard } from '@/components/CustomCard';
import BarChart from '@/components/BarChart';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const data = [
    { label: 'Jan', value: 10 },
    { label: 'Feb', value: 20 },
    { label: 'Mar', value: 15 },
    { label: 'Apr', value: 30 },
    { label: 'May', value: 25 },
    { label: 'Jun', value: 35 },
    { label: 'Jul', value: 45 },
    { label: 'Jun', value: 35 },
    { label: 'Aug', value: 55 },
    { label: 'Sep', value: 5 },
  ];
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.cardDetails}>Expense Tracker</ThemedText>
        <Link href={"/addExpenses"}><Icon size={24} source={"plus"} /></Link>
        {/* <Button></Button> */}
      </ThemedView>
      <Divider style={{ marginBottom: 10 }}></Divider>
      <BarChart data={data} width={300} height={200} barColor="purple" />
      <ThemedText style={{ fontSize: 22 }}>Recent Expenses</ThemedText>
      <CustomCard title='Random' total='5' />
      <CustomCard title='Groceries' date='July 05, 2024' image='https://ik.imagekit.io/cascades/groceries.png?updatedAt=1720263212252' total='5,300' />
      <CustomCard title='Credit Card' date='July 01, 2024' image='https://ik.imagekit.io/cascades/credit-card.png?updatedAt=1720263212234' total='10,000' />
      <CustomCard title='MoveIt' date='June 24, 2024' image='https://ik.imagekit.io/cascades/payment.png?updatedAt=1720263212260' total='64' />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "auto",
    flex: 1,
    marginTop: 20
  },
  cardDetails: {
    fontSize: 28,
    fontWeight: "bold",
    paddingVertical: 5
  }
});
