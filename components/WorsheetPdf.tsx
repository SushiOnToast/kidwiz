
import { Question } from "@/lib/types";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

interface WorksheetPdfProps {
  questions: Question[];
  answers: boolean;
  title?: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
  },
  header: {
    marginBottom: 25,
    borderBottom: "1px solid #cccccc",
    paddingBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 10,
    color: "#666666",
  },
  question: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center",
  },
  questionText: {
    fontSize: 12,
  },
  answerSpace: {
    borderBottom: "1px solid #999999",
    flexGrow: 1,
    marginLeft: 12,
    height: 20,
  },
  answerHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  answer: {
    marginBottom: 12,
    fontSize: 12,
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#999999",
  },
});

const WorksheetPdf = ({
  questions,
  answers,
  title = "Maths Worksheet",
}: WorksheetPdfProps) => {
  return (
    <Document>
      {/* Main worksheet */}
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            Name: ____________________    Date: ____________________
          </Text>
        </View>

        {questions.map((question, index) => (
          <View key={index} style={styles.question} wrap={false}>
            <Text style={styles.questionText}>
              {index + 1}. {question.question} =
            </Text>
            <View style={styles.answerSpace} />
          </View>
        ))}

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* Answer key */}
      {answers && (
        <Page size="A4" style={styles.page} wrap>
          <View style={styles.header}>
            <Text style={styles.title}>Answer Key</Text>
            <Text style={styles.subtitle}>{title}</Text>
          </View>

          {questions.map((question, index) => (
            <Text key={index} style={styles.answer}>
              {index + 1}. {question.answer}
            </Text>
          ))}
        </Page>
      )}
    </Document>
  );
};

export default WorksheetPdf;
