import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, Divider, Menu, Modal, Portal, TextInput } from 'react-native-paper';
import { useEffect, useMemo, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from 'expo-router';

type CalendarProps = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

type OptionProps = {
  label?: string;
  value?: string;
}
export default function AddExpense() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState<boolean>(false);
  const [dateVisible, setDateVisible] = useState<boolean>(false);
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<OptionProps>({});
  const [date, setDate] = useState<string | any>(new Date().toISOString());
  console.log("date", date);
  
  const expenseType = [
    { label: 'Groceries', value: 'https://ik.imagekit.io/cascades/groceries.png?updatedAt=1720263212252' },
    { label: 'Fare', value: 'https://ik.imagekit.io/cascades/payment.png?updatedAt=1720263212260' },
    { label: 'Credit Card', value: 'https://ik.imagekit.io/cascades/credit-card.png?updatedAt=1720263212234' },
    { label: 'Loans', value: 'https://ik.imagekit.io/cascades/loan.png?updatedAt=1720271953578' },
    { label: 'Others', value: 'https://ik.imagekit.io/cascades/more-information.png?updatedAt=1720272010463' },
  ];
  const containerStyle = { backgroundColor: 'white', padding: 30 };

  useEffect(() => {
    navigation.setOptions({ 
      // title: "Add Record",
      // headerBackgroundColor:{ light: '#A1CEDC', dark: '#000' }
      headerShown: false,
    })
  }, [navigation])

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const hideModal = () => setDateVisible(false);
  const clearDate = () => setDate("");

  const handleMenuPress = (expense: OptionProps) => {
    if (expense.label === "Others") {
      setShowOtherInput(true)
    } else {
      setShowOtherInput(false)
    }
    setSelectedType(expense)
    closeMenu();
  }

  const marked = useMemo(() => {
    return {
      [date]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'purple',
        selectedTextColor: 'white'
      }
    };
  }, [date]);

  const handleDatePress = (date: CalendarProps) => {
    setDate(date.dateString);
    hideModal();
  }

  const formattedDate = () => {
    return new Date(date).toLocaleDateString('en-US', {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
  }

  const handleAmountChange = (e:string) => {
    const numericValue = Number(e.replace(/[^0-9]/g, ''));
    setAmount(numericValue)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.cardDetails}>Add Expense(s)</ThemedText>
      </ThemedView>
      <Divider style={{ marginBottom: 10 }}></Divider>
      <TextInput
        onChangeText={(e) => handleAmountChange(e)}
        label={"Amount"}
        mode='outlined'
        placeholder='Enter amount spent'
        keyboardType='numeric'
        inputMode='numeric'
        value={amount?.toString()}
        left={<TextInput.Affix text='₱' />}
      />
      <ThemedView>
        <ThemedText>Category:</ThemedText>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchorPosition='bottom'
          anchor={<Button icon={selectedType.label && { uri: selectedType.value }} style={styles.menu} mode={'contained-tonal'} onPress={openMenu}>{selectedType.label ?? 'Choose a category'}</Button>}>
          {expenseType.map((item) => (
            <Menu.Item key={item.value} onPress={() => handleMenuPress(item)} title={item.label} />
          ))}
        </Menu>
        {showOtherInput && <TextInput label={"Enter your expense category"} mode='outlined' />}
      </ThemedView>
      <ThemedView>
        <ThemedText>Date:</ThemedText>
        <Button style={styles.menu} mode={'contained-tonal'} onPress={() => setDateVisible(true)}>{date ? formattedDate() : "Select a date"}</Button>
      </ThemedView>
      <Button onPress={() => navigation.goBack()}>Back</Button>
      <Portal>
        <Modal visible={dateVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Calendar
            current={date}
            markedDates={marked}
            onDayPress={(day: CalendarProps) => handleDatePress(day)}
          />
          <Button disabled={!date} onPress={clearDate}>Clear Selection</Button>
        </Modal>
      </Portal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 50
  },
  cardDetails: {
    fontSize: 28,
    fontWeight: "bold",
    paddingVertical: 5
  },
  menu: {
    borderRadius: 0,
    paddingVertical: 5,
  }
});
