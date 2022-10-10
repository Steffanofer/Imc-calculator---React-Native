import React, { useState } from "react"
import {
    FlatList, Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    Vibration,
    View
} from "react-native"
import ResultImc from "./ResultImc/"
import styles from "./style"


export default function Form() {

    const [height, setHeight] = useState(null)
    const [weight, setWeigth] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErroMessage] = useState(null)
    const [imcList, setImcList] = useState([])

    function imcCalculator() {
        let heightFormat = height.replace(",", ".")
        let totalImc = ((weight / (heightFormat * heightFormat)).toFixed(2));
        setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
        setImc(totalImc);

    }

    function verificationImc() {
        if (imc == null) {
            Vibration.vibrate();
            setErroMessage("Campo obrigatório*")
        }
    }

    function validationImc() {
        if (weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeigth(null)
            setMessageImc("Seu imc é igual:")
            setTextButton("Calcular Novamente")
            setErroMessage(null)

        } else {
            verificationImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("Preencha o peso e altura")
        }
    }

    return (
        <View style={styles.formContext}>
            {imc == null ?
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setHeight}
                        value={height}
                        placeholder="Ex. 1.75"
                        keyboardType="numeric"
                    />
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <Text style={styles.formLabel}>Peso</Text>
                    <TextInput
                        style={styles.input}
                        value={weight}
                        onChangeText={setWeigth}
                        placeholder="Ex. 75.365"
                        keyboardType="numeric"
                    />
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TouchableOpacity
                        style={styles.buttonCalculation}
                        onPress={() => validationImc()}>
                        <Text style={styles.textButtomCalculation}> {textButton}</Text>
                    </TouchableOpacity>
                </Pressable>
                :
                <View style={styles.exibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc} />
                    <TouchableOpacity
                        style={styles.buttonCalculation}
                        onPress={() => validationImc()}>
                        <Text style={styles.textButtomCalculation}> {textButton}</Text>
                    </TouchableOpacity>
                </View>
            }
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.listImcs}
                data={imcList.reverse()}
                renderItem={({ item }) => {
                    return (
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                            {item.imc}
                        </Text>
                    )
                }}
                keyExtractor={(item) => { item.id }}
            />
        </View>


    );
}