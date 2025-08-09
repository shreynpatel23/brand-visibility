import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, ArrowRight, ArrowLeft, X } from 'lucide-react';
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

const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [targetAudience, setTargetAudience] = useState<string[]>([]);
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [teamMembers, setTeamMembers] = useState([{ email: '', role: 'Editor' }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const brandForm = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: '',
      category: '',
      region: '',
      useCase: '',
    },
  });

  const categories = ['Technology', 'Healthcare', 'Finance', 'Retail', 'Education', 'Entertainment', 'Other'];
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa', 'Global'];
  const roles = ['Admin', 'Editor', 'Viewer'];

  const addItem = (field: string, value: string) => {
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

  const removeItem = (field: string, index: number) => {
    if (field === 'targetAudience') {
      setTargetAudience(prev => prev.filter((_, i) => i !== index));
    } else if (field === 'competitors') {
      setCompetitors(prev => prev.filter((_, i) => i !== index));
    } else if (field === 'features') {
      setFeatures(prev => prev.filter((_, i) => i !== index));
    }
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { email: '', role: 'Editor' }]);
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    const updated = teamMembers.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    );
    setTeamMembers(updated);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Here you would normally save the data to your backend
      console.log('Brand data:', { ...brandForm.getValues(), targetAudience, competitors, features });
      console.log('Team members:', teamMembers);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/app/dashboard');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  const TagInput: React.FC<{ 
    items: string[], 
    onAdd: (value: string) => void, 
    onRemove: (index: number) => void,
    placeholder: string 
  }> = ({ items, onAdd, onRemove, placeholder }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        e.preventDefault();
        onAdd(inputValue);
        setInputValue('');
      }
    };

    return (
      <div className="space-y-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
            >
              {item}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center">
              <Building2 className="h-12 w-12 text-indigo-600" />
              <span className="ml-2 text-3xl font-bold text-gray-900 dark:text-white">BrandViz</span>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome to Brand Visibility Tracker
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Let's get you set up in just a few steps
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              1
            </div>
            <div className={`h-1 w-16 ${
              currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
            <span>Create Brand</span>
            <span>Invite Team</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your First Brand</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Tell us about the brand you want to track
                </p>
              </div>

              <div className="space-y-4">
                <Form {...brandForm}>
                  <div className="space-y-4">
                    <FormField
                      control={brandForm.control}
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
                        control={brandForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map(cat => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={brandForm.control}
                        name="region"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Region *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select region" />
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Target Audience
                      </label>
                      <TagInput
                        items={targetAudience}
                        onAdd={(value) => addItem('targetAudience', value)}
                        onRemove={(index) => removeItem('targetAudience', index)}
                        placeholder="Add target audience (press Enter to add)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Main Competitors
                      </label>
                      <TagInput
                        items={competitors}
                        onAdd={(value) => addItem('competitors', value)}
                        onRemove={(index) => removeItem('competitors', index)}
                        placeholder="Add competitor names (press Enter to add)"
                      />
                    </div>

                    <FormField
                      control={brandForm.control}
                      name="useCase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Use Case</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="Describe how your brand is used or what problem it solves"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Key Features
                      </label>
                      <TagInput
                        items={features}
                        onAdd={(value) => addItem('features', value)}
                        onRemove={(index) => removeItem('features', index)}
                        placeholder="Add key features (press Enter to add)"
                      />
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Invite Your Team</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Add team members to collaborate on brand tracking (optional)
                </p>
              </div>

              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                      placeholder="team@example.com"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <select
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    {teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="p-2 text-red-400 hover:text-red-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTeamMember}
                  className="w-full py-2 px-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  + Add team member
                </button>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            )}

            {currentStep === 1 ? (
              <Button
                onClick={async () => {
                  const isValid = await brandForm.trigger();
                  if (isValid) {
                    setCurrentStep(2);
                  }
                }}
                className="ml-auto"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="ml-auto space-x-3">
                <Button
                  variant="outline"
                  onClick={handleComplete}
                  disabled={loading}
                >
                  Skip for now
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={loading}
                >
                  {loading ? 'Setting up...' : 'Go to Dashboard'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;