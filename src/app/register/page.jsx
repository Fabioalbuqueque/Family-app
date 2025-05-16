'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  StylesMain,
  StylesForm,
  StylesTitle,
  StylesInput,
  StylesButton,
  StylesError,
  StylesSuccess,
  StylesLink
} from './register.style'

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Verificar se já existe um usuário logado
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/dashboard')
    }
  }, [router])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess('')
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Verificar se o email já está cadastrado
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const emailExists = users.some(user => user.email === formData.email)
      
      if (emailExists) {
        setErrors({ email: 'Este email já está cadastrado' })
        setIsSubmitting(false)
        return
      }

      // Simular delay de API
      setTimeout(() => {
        // Salvar novo usuário
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
        
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        
        setSuccess('Cadastro realizado com sucesso!')
        setIsSubmitting(false)
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }, 1000)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpar erro do campo quando ele é alterado
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <StylesMain>
      <StylesForm onSubmit={handleSubmit}>
        <StylesTitle>Cadastro</StylesTitle>
        
        <div>
          <StylesInput
            type="text"
            name="name"
            placeholder="Nome completo"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <StylesError>{errors.name}</StylesError>}
        </div>
        
        <div>
          <StylesInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <StylesError>{errors.email}</StylesError>}
        </div>
        
        <div>
          <StylesInput
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <StylesError>{errors.password}</StylesError>}
        </div>
        
        <div>
          <StylesInput
            type="password"
            name="confirmPassword"
            placeholder="Confirmar senha"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <StylesError>{errors.confirmPassword}</StylesError>}
        </div>
        
        <StylesButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </StylesButton>
        
        {success && <StylesSuccess>{success}</StylesSuccess>}
        
        <StylesLink>
          Já tem uma conta? <Link href="/">Faça login</Link>
        </StylesLink>
      </StylesForm>
    </StylesMain>
  )
} 