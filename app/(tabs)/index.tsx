import { Animated, Dimensions, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Divider, Icon } from 'react-native-paper';
import { CustomCard } from '@/components/CustomCard';
import BarChart from '@/components/BarChart';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function HomeScreen() {
  const { width, height } = Dimensions.get("window");
  const color = useColorScheme();
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

  const [expenses, setExpenses] = useState<any[]>([]);
  const slideAnim = useState(new Animated.Value(height))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];
  const translateXAnim = useState(new Animated.Value(-width))[0];

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateXAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data, error } = await supabase.from('expenses').select("*")
        if (error) {
          console.log('Error fetching expenses:', error.message);
          return;
        }

        if (data && data.length > 0) {
          console.log("TODOS: ", data);

          setExpenses(data);
        }
      } catch (error:any) {
        console.error('Error fetching expenses:', error.message);
      }
    };

    getTodos();
  }, []);
  
  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: translateXAnim }] }}>
        <ThemedView style={[styles.card, styles.customPadding]}>
          <ThemedText style={styles.cardDetails}>Expense Tracker</ThemedText>
          <Link href={"/add-expense"}><Icon size={24} source={"plus"} /></Link>
        </ThemedView>
        <Divider style={{ marginBottom: 10 }}></Divider>
        <BarChart data={data} width={300} height={200} barColor="purple" />
        <Divider style={{ marginBottom: 10 }}></Divider>
      </Animated.View>
      <Animated.View style={[styles.recent, { transform: [{ translateY: slideAnim }], backgroundColor: color === "dark" ? "purple" : "#d0d2d6" }]}>
        <Text style={{ fontSize: 22 }}>Recent Expenses</Text>
        <CustomCard title='Random' total='5' />
        <CustomCard title='Groceries' date='July 05, 2024' image='https://ik.imagekit.io/cascades/groceries.png?updatedAt=1720263212252' total='5,300' />
        <CustomCard title='Credit Card' date='July 01, 2024' image='https://ik.imagekit.io/cascades/credit-card.png?updatedAt=1720263212234' total='10,000' />
        <CustomCard title='MoveIt' date='June 24, 2024' image='https://ik.imagekit.io/cascades/payment.png?updatedAt=1720263212260' total='64' />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "auto",
    paddingTop: 60,
    paddingBottom: 20
  },
  cardDetails: {
    fontSize: 28,
    fontWeight: "bold",
    paddingVertical: 5
  },
  customPadding: {
    paddingHorizontal: 32
  },
  recent: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  }
});
