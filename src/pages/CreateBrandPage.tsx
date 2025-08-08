import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';

const brandSchema = z.object({
  name: z.string().min(2, 'Brand name must be at least 2 characters'),
  category: z.string().min(1, 'Please select a category'),
  region: z.string().min(1, 'Please select a region'),
  useCase: z.string().optional(),
});

type BrandFormValues = z.infer<typeof brandSchema>;

const CreateBrandPage: React.FC = () => {
  const [targetAudience, setTargetAudience] = useState<string[]>([]);
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Technology', 'Healthcare', 'Finance', 'Retail', 'Education', 
    'Entertainment', 'Manufacturing', 'Professional Services', 'Other'
  ];
  
  const regions = [
    'North America', 'Europe', 'Asia Pacific', 'Latin America', 
    'Middle East & Africa', 'Global'
  ];

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: '',
      category: '',
      region: '',
      useCase: '',
    },
  });

  const addItem = (field: 'targetAudience' | 'competitors' | 'features', value: string) => {
    if (value.trim()) {
      if (field === 'targetAudience') {
        setTargetAudience(prev => [...prev, value.trim()]);
      } else if (field === 'competitors') {
        setCompetitors(prev => [...prev, value.trim()]);
      } else if (field === 'features') {
        setFeatures(prev => [...prev, value.trim()]);
      }
    }
  };

  const removeItem = (field: 'targetAudience' | 'competitors' | 'features', index: number) => {
    if (field === 'targetAudience') {
      setTargetAudience(prev => prev.filter((_, i) => i !== index));
    } else if (field === 'competitors') {
      setCompetitors(prev => prev.filter((_, i) => i !== index));
    } else if (field === 'features') {
      setFeatures(prev => prev.filter((_, i) => i !== index));
    }
  };

  const onSubmit = async (values: BrandFormValues) => {
    setLoading(true);
    
    try {
      // Here you would normally save to your backend
      console.log('Creating brand:', { ...values, targetAudience, competitors, features });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/app/dashboard');
    } catch (error) {
      console.error('Failed to create brand:', error);
    } finally {
      setLoading(false);
    }
  };

  const TagInput: React.FC<{ 
    items: string[], 
    onAdd: (value: string) => void, 
    onRemove: (index: number) => void,
    placeholder: string,
    label: string
  }> = ({ items, onAdd, onRemove, placeholder, label }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        e.preventDefault();
        onAdd(inputValue);
        setInputValue('');
      }
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        {items.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {items.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
              >
                {item}
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-primary/60 hover:bg-primary/20 hover:text-primary"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Press Enter to add</p>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link
          to="/app/dashboard"
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Brand</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Add a new brand to track its visibility across AI models
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Basic Information</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your brand name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regions.map(region => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Target Audience */}
            <TagInput
              items={targetAudience}
              onAdd={(value) => addItem('targetAudience', value)}
              onRemove={(index) => removeItem('targetAudience', index)}
              placeholder="e.g., Small business owners, Healthcare professionals, Students"
              label="Target Audience"
            />

            {/* Competitors */}
            <TagInput
              items={competitors}
              onAdd={(value) => addItem('competitors', value)}
              onRemove={(index) => removeItem('competitors', index)}
              placeholder="e.g., Competitor A, Competitor B"
              label="Main Competitors"
            />

            {/* Use Case */}
            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Use Case</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Describe how your brand is used or what problem it solves"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Features */}
            <TagInput
              items={features}
              onAdd={(value) => addItem('features', value)}
              onRemove={(index) => removeItem('features', index)}
              placeholder="e.g., Real-time analytics, Mobile app, 24/7 support"
              label="Key Features"
            />

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" asChild>
                <Link to="/app/dashboard">
                  Cancel
                </Link>
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Brand'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBrandPage;