import React, { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Select,
  SelectItem,
  Textarea,
  Chip,
  Progress,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@heroui/react'
import { ChevronDownIcon, UserIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

const CompanyForm = ({ userData, onLogout }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  
  const [companyData, setCompanyData] = useState({
    companyName: '',
    companyType: '',
    industry: '',
    employeeCount: '',
    annualRevenue: '',
    description: '',
    website: '',
    phone: '',
    address: '',
    city: '',
    country: 'RU'
  })

  const [errors, setErrors] = useState({})

  const totalSteps = 3

  const companyTypes = [
    { key: 'llc', label: 'ООО' },
    { key: 'jsc', label: 'АО' },
    { key: 'ie', label: 'ИП' },
    { key: 'partnership', label: 'Партнерство' },
    { key: 'other', label: 'Другое' }
  ]

  const industries = [
    { key: 'tech', label: 'Технологии' },
    { key: 'finance', label: 'Финансы' },
    { key: 'healthcare', label: 'Здравоохранение' },
    { key: 'education', label: 'Образование' },
    { key: 'retail', label: 'Розничная торговля' },
    { key: 'manufacturing', label: 'Производство' },
    { key: 'services', label: 'Услуги' },
    { key: 'other', label: 'Другое' }
  ]

  const employeeCounts = [
    { key: '1-10', label: '1-10 сотрудников' },
    { key: '11-50', label: '11-50 сотрудников' },
    { key: '51-200', label: '51-200 сотрудников' },
    { key: '201-1000', label: '201-1000 сотрудников' },
    { key: '1000+', label: 'Более 1000 сотрудников' }
  ]

  const revenueRanges = [
    { key: '0-1m', label: 'До 1 млн ₽' },
    { key: '1m-10m', label: '1-10 млн ₽' },
    { key: '10m-100m', label: '10-100 млн ₽' },
    { key: '100m-1b', label: '100 млн - 1 млрд ₽' },
    { key: '1b+', label: 'Более 1 млрд ₽' }
  ]

  const handleInputChange = (field, value) => {
    setCompanyData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!companyData.companyName) {
          newErrors.companyName = 'Название компании обязательно'
        }
        if (!companyData.companyType) {
          newErrors.companyType = 'Выберите тип компании'
        }
        if (!companyData.industry) {
          newErrors.industry = 'Выберите отрасль'
        }
        break
      case 2:
        if (!companyData.employeeCount) {
          newErrors.employeeCount = 'Укажите количество сотрудников'
        }
        if (!companyData.annualRevenue) {
          newErrors.annualRevenue = 'Укажите годовой оборот'
        }
        break
      case 3:
        if (!companyData.description) {
          newErrors.description = 'Добавьте описание компании'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsLoading(true)

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Сохраняем данные компании
      const finalData = {
        ...companyData,
        userId: userData.id,
        createdAt: new Date().toISOString()
      }

      console.log('Company data saved:', finalData)
      setIsCompleted(true)
    } catch (error) {
      console.error('Error saving company data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-5">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Основная информация о компании
        </h3>
        <p className="text-gray-400 text-sm">Расскажите о вашей компании</p>
      </div>
      <div className="flex flex-col gap-1">
      <label className="text-gray-300 text-left ml-2">Название компании:</label>
      <Input
        placeholder="Введите название компании"
        value={companyData.companyName}
        onChange={(e) => handleInputChange('companyName', e.target.value)}
        isInvalid={!!errors.companyName}
        errorMessage={errors.companyName}
        variant="bordered"
        endContent={<div className="absolute right-3 top-1/2 -translate-y-1/2"><BuildingOfficeIcon className="w-4 h-4 text-purple-400" /></div>}
        classNames={{
          input: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2",
          label: "text-gray-300",
          inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500"
        }}
      />
      </div>
      <div className="flex flex-col gap-1">
      <label className="text-gray-300 text-left ml-2">Тип компании:</label>
      <Select
        placeholder="Выберите тип"
        selectedKeys={companyData.companyType ? [companyData.companyType] : []}
        onSelectionChange={(keys) => handleInputChange('companyType', Array.from(keys)[0])}
        isInvalid={!!errors.companyType}
        errorMessage={errors.companyType}
        variant="bordered"
        disableAnimation={true}
        popoverProps={{
          placement: "bottom",
          offset: 10,
          classNames: {
            content: "bg-slate-800 border border-white/20 rounded-xl p-2"
          }
        }}
        classNames={{
          trigger: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500 ",
          label: "text-gray-300",
          value: "text-white ",
          placeholder: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2 ",
          inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500",
          selectorIcon: "hidden"
        }}
      >
        {companyTypes.map((type) => (
          <SelectItem key={type.key} value={type.key}>
            {type.label}
          </SelectItem>
        ))}
      </Select>
      </div>
      <div className="flex flex-col gap-1">
      <label className="text-gray-300 text-left ml-2">Отрасль:</label>
      <Select
        placeholder="Выберите отрасль"
        selectedKeys={companyData.industry ? [companyData.industry] : []}
        onSelectionChange={(keys) => handleInputChange('industry', Array.from(keys)[0])}
        isInvalid={!!errors.industry}
        errorMessage={errors.industry}
        variant="bordered"
        popoverProps={{
          placement: "bottom", 
          offset: 10,
          classNames: {
            content: "bg-slate-800 border border-white/20 rounded-xl p-2"
          }
        }}
        classNames={{
          trigger: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500",
          label: "text-gray-300",
          value: "text-white",
          placeholder: "text-left text-gray-400",
          selectorIcon: "hidden"
        }}
      >
        {industries.map((industry) => (
          <SelectItem key={industry.key} value={industry.key}>
            {industry.label}
          </SelectItem>
        ))}
      </Select>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-5">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Размер и масштаб
        </h3>
        <p className="text-gray-400 text-sm">Оцените масштаб вашего бизнеса</p>
      </div>
      <div className="flex flex-col gap-1">
      <label className="text-gray-300 text-left ml-2">Количество сотрудников:</label>
      <Select
        placeholder="Выберите количество"
        selectedKeys={companyData.employeeCount ? [companyData.employeeCount] : []}
        onSelectionChange={(keys) => handleInputChange('employeeCount', Array.from(keys)[0])}
        isInvalid={!!errors.employeeCount}
        errorMessage={errors.employeeCount}
        variant="bordered"
        popoverProps={{
          placement: "bottom",
          offset: 10,
          classNames: {
            content: "bg-slate-800 border border-white/20 rounded-xl p-2"
          }
        }}
        classNames={{
          trigger: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500",
          label: "text-gray-300",
          value: "text-white",
          placeholder: "text-left text-gray-400",
          selectorIcon: "hidden"
        }}
      >
        {employeeCounts.map((count) => (
          <SelectItem key={count.key} value={count.key}>
            {count.label}
          </SelectItem>
        ))}
      </Select>
      </div>
      <div className="flex flex-col gap-1">
      <label className="text-gray-300 text-left ml-2">Годовой оборот:</label>
      <Select
        placeholder="Выберите диапазон"
        selectedKeys={companyData.annualRevenue ? [companyData.annualRevenue] : []}
        onSelectionChange={(keys) => handleInputChange('annualRevenue', Array.from(keys)[0])}
        isInvalid={!!errors.annualRevenue}
        errorMessage={errors.annualRevenue}
        variant="bordered"
        popoverProps={{
          placement: "bottom",
          offset: 10,
          classNames: {
            content: "bg-slate-800 border border-white/20 rounded-xl p-2"
          }
        }}
        classNames={{
          trigger: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500",
          label: "text-gray-300",
          value: "text-white",
          placeholder: "text-left text-gray-400",
          selectorIcon: "hidden"
        }}
      >
        {revenueRanges.map((revenue) => (
          <SelectItem key={revenue.key} value={revenue.key}>
            {revenue.label}
          </SelectItem>
        ))}
      </Select>
      </div>
      <div className="flex flex-col gap-1">
      <label className="text-gray-300 text-left ml-2">Веб-сайт:</label>
      <Input
        value={companyData.website}
        onChange={(e) => handleInputChange('website', e.target.value)}
        variant="bordered"
        placeholder="https://"
        classNames={{
          input: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2",
          label: "text-gray-300",
          inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500 relative pr-10"
        }}
      />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-5">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Дополнительная информация
        </h3>
        <p className="text-gray-400 text-sm">Расскажите подробнее о вашей компании</p>
      </div>

      <Input
        placeholder="Расскажите о том, чем занимается ваша компания, какие услуги предоставляет..."
        value={companyData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        isInvalid={!!errors.description}
        errorMessage={errors.description}
        variant="bordered"
        minRows={4}
        classNames={{
          input: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2",
          label: "text-gray-300",
          inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500 relative pr-10"
        }}
      />
      <div className="flex flex-col gap-1">
      <label className="text-gray-300 text-left ml-2">Телефон (необязательно):</label>
      <Input
        placeholder="+7 (999) 123-45-67"
        value={companyData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        variant="bordered"
        classNames={{
          input: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2",
          label: "text-gray-300",
          inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500 relative pr-10"
        }}
      />
      </div>
      <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
      <label className="text-gray-300 text-left ml-2">Город:</label>
        <Input
          placeholder="Москва"
          value={companyData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          variant="bordered"
          classNames={{
            input: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2",
            label: "text-gray-300",
            inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500 relative pr-10"
          }}
        />
        </div>
        <div className="flex flex-col gap-1">
        <label className="text-gray-300 text-left ml-2">Адрес:</label>
          <Input
            placeholder="ул. Примерная, д. 1"
            value={companyData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            variant="bordered"
            classNames={{
              input: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2",
              label: "text-gray-300",
              inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500 relative pr-10"
            }}
          />
        </div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      default:
        return null
    }
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl">
          <CardBody className="text-center space-y-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                Отлично!
              </h2>
              <p className="text-gray-300 text-lg">
                Ваша компания успешно настроена. Теперь вы можете использовать все возможности AI-платформы.
              </p>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
              onClick={() => {
                setIsCompleted(false)
                setCurrentStep(1)
              }}
            >
              Начать заново
            </Button>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="w-12 h-12 ring-2 ring-purple-500/50"
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-gray-400 text-sm">{userData.email}</p>
            </div>
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                endContent={<ChevronDownIcon className="w-4 h-4" />}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full"
              >
                <UserIcon className="w-4 h-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="User menu"
              className="bg-slate-800 border border-white/20 rounded-xl p-2"
            >
              <DropdownItem key="profile" className="text-gray-300 hover:bg-white/10">Профиль</DropdownItem>
              <DropdownItem key="settings" className="text-gray-300 hover:bg-white/10">Настройки</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={onLogout} className="hover:bg-red-500/20">
                Выйти
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Progress */}
        <Card className="mb-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl">
          <CardBody className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-300">
                  Шаг {currentStep} из {totalSteps}
                </span>
                <span className="text-sm text-purple-400 font-semibold">
                  {Math.round((currentStep / totalSteps) * 100)}%
                </span>
              </div>
              <Progress
                value={(currentStep / totalSteps) * 100}
                color="secondary"
                className="w-full"
                classNames={{
                  track: "bg-white/20",
                  indicator: "bg-gradient-to-r from-purple-500 to-pink-500"
                }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-400">
              <span>Основная информация</span>
              <span>Размер компании</span>
              <span>Дополнительно</span>
            </div>
          </CardBody>
        </Card>

        {/* Form */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl">
          <CardHeader className="pb-0 flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Настройка компании
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Заполните информацию о вашей компании для продолжения работы
                </p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="pt-8">
            {renderStepContent()}

            <div className="border-t border-white/20 my-8"></div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="bordered"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
              >
                Назад
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  Далее
                </Button>
              ) : (
                <Button
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Сохранение...' : 'Завершить настройку'}
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default CompanyForm
