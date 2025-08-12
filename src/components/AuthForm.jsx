import React, { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Link,
  Chip
} from '@heroui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import yandexIcon from '../assets/yandex-icon.svg'
import googleIcon from '../assets/google-icon.svg'

const AuthForm = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userRegion, setUserRegion] = useState('RU')
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: '',
    agreeToTerms: false
  })

  const [errors, setErrors] = useState({})

  // Определяем регион пользователя
  useEffect(() => {
    // Mock: определяем регион по IP или языку браузера
    const browserLang = navigator.language || navigator.userLanguage
    if (browserLang.startsWith('ru')) {
      setUserRegion('RU')
    } else {
      setUserRegion('INT')
    }
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Очищаем ошибку для этого поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email обязателен'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов'
    }

    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'Имя обязательно'
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Фамилия обязательна'
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают'
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'Необходимо согласие с условиями'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        isNewUser: !isLogin
      }

      onAuthSuccess(userData)
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialAuth = async (provider) => {
    setIsLoading(true)
    
    try {
      // Mock social auth
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: `user_${provider}@example.com`,
        firstName: 'Пользователь',
        lastName: provider === 'google' ? 'Google' : 'Яндекс',
        isNewUser: true,
        socialProvider: provider
      }

      onAuthSuccess(userData)
    } catch (error) {
      console.error('Social auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl">
        <CardHeader className="flex flex-col gap-4 items-center pb-6">
          <div className="flex flex-col items-center gap-3">
            {/* AI Logo */}
            <div className="relative mt-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {isLogin ? 'Добро пожаловать' : 'Создать аккаунт'}
              </h1>
              <p className="text-gray-300 text-sm mt-2">
                {isLogin ? 'Войдите в свой аккаунт для продолжения' : 'Присоединяйтесь к AI-революции'}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardBody className="gap-6">
          {/* Социальная авторизация */}
          <Button
            variant="bordered"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
            onClick={() => handleSocialAuth(userRegion === 'RU' ? 'yandex' : 'google')}
            disabled={isLoading}
            startContent={
              <img 
                src={userRegion === 'RU' ? yandexIcon : googleIcon} 
                alt={userRegion === 'RU' ? 'Яндекс' : 'Google'}
                className="w-5 h-5 mr-2"
              />
            }
          >
            {isLoading ? 'Загрузка...' : 
              `Войти через ${userRegion === 'RU' ? 'Яндекс' : 'Google'}`
            }
          </Button>

          {/* Разделитель */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm rounded-xl">или</span>
            </div>
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4 ">
                <Input
                  placeholder="Введите имя"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  isInvalid={!!errors.firstName}
                  errorMessage={errors.firstName}
                  variant="bordered"
                  classNames={{
                    input: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2",
                    label: "text-gray-300",
                    inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500 relative pr-10"
                  }}
                />
                <Input
                  placeholder="Введите фамилию"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  isInvalid={!!errors.lastName}
                  errorMessage={errors.lastName}
                  variant="bordered"
                  classNames={{
                    input: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2",
                    label: "text-gray-300",
                    inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500 relative pr-10"
                  }}
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-gray-300 text-left ml-2">Email:</label>
              <Input
                placeholder="Введите email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                variant="bordered"
                classNames={{
                  input: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2",
                  inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500"
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-300 text-left ml-2">Пароль:</label>
              <Input
                placeholder="Введите пароль"
                endContent={
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <EyeIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                }
                type={isVisible ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                variant="bordered"
                classNames={{
                  input: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2",
                  label: "text-gray-300",
                  inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500 relative pr-10"
                }}
              />
            </div>
            {!isLogin && (
               <div className="flex flex-col gap-1">
              <label className="text-gray-300 text-left ml-2">Подтвердите пароль:</label>
              <Input
                placeholder="Повторите пароль"
                type={isVisible ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                variant="bordered"
                classNames={{
                  input: "bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2 ml-2",
                  label: "text-gray-300",
                  inputWrapper: "bg-white/10 border-white/20 hover:border-white/40 focus-within:border-purple-500 relative pr-10"
                }}
              />
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start ml-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded bg-white/10"
                />
                <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-300">
                  Я согласен с{' '}
                  <Link href="#" size="sm" className="text-purple-400 hover:text-purple-300">
                    условиями использования
                  </Link>
                  {' '}и{' '}
                  <Link href="#" size="sm" className="text-purple-400 hover:text-purple-300">
                    политикой конфиденциальности
                  </Link>
                </label>
              </div>
            )}

            {errors.agreeToTerms && (
              <p className="text-red-400 text-sm">{errors.agreeToTerms}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Обработка...' : (isLogin ? 'Войти' : 'Создать аккаунт')}
            </Button>
          </form>

          {/* Переключение между формами */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
              <Button
                variant="light"
                size="sm"
                className="text-purple-400 hover:text-purple-300 bg-transparent "
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    firstName: '',
                    lastName: '',
                    companyName: '',
                    agreeToTerms: false
                  })
                  setErrors({})
                }}
              >
                {isLogin ? 'Зарегистрироваться' : 'Войти'}
              </Button>
            </p>
          </div>

          {/* Индикатор региона */}
          <div className="text-center">
            <Chip
              variant="flat"
              className="bg-white/10 border border-white/20 text-gray-300"
              size="sm"
            >
              Регион: {userRegion === 'RU' ? 'Россия' : 'Международный'}
            </Chip>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default AuthForm
