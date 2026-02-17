import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { useTodos } from '../context/TodoContext';
import { generateTodos } from '../services/groqService';

export default function AiTodoScreen() {
  const { addMultipleTodos } = useTodos();
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedItems, setGeneratedItems] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (prompt.trim() === '') return;

    setLoading(true);
    setGeneratedItems([]);

    try {
      const todos = await generateTodos(prompt.trim());
      setGeneratedItems(todos);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAll = () => {
    addMultipleTodos(generatedItems, 'ai');
    setGeneratedItems([]);
    setPrompt('');
    Alert.alert('Success', `Added ${generatedItems.length} todos to your list!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Todo Generator</Text>
      <Text style={styles.subtitle}>
        Describe what you need to accomplish and AI will create todos for you.
      </Text>

      <TextInput
        style={styles.promptInput}
        placeholder='e.g. "I need to study for Calculus"'
        value={prompt}
        onChangeText={setPrompt}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={[styles.generateButton, loading ? styles.generateButtonDisabled : undefined]}
        onPress={handleGenerate}
        disabled={loading || prompt.trim() === ''}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.generateButtonText}>Generate Todos</Text>
        )}
      </TouchableOpacity>

      {generatedItems.length > 0 && (
        <View style={styles.previewSection}>
          <Text style={styles.previewTitle}>
            Generated {generatedItems.length} todos:
          </Text>
          <ScrollView style={styles.previewList}>
            {generatedItems.map((item, index) => (
              <View key={index} style={styles.previewItem}>
                <Text style={styles.previewBullet}>•</Text>
                <Text style={styles.previewText}>{item}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.addAllButton} onPress={handleAddAll}>
            <Text style={styles.addAllButtonText}>Add All to My List</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  promptInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 80,
    marginBottom: 16,
  },
  generateButton: {
    backgroundColor: '#42A5F5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  previewSection: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  previewList: {
    flex: 1,
    marginBottom: 16,
  },
  previewItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  previewBullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#42A5F5',
  },
  previewText: {
    flex: 1,
    fontSize: 15,
  },
  addAllButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addAllButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
