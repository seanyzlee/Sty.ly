#!/usr/bin/python
# see https://github.com/saketh12/Auto1111SDK
'''
Marco Guardigli, mgua@tomware.it

automatic111sdk is a library allowing automatic1111 stablediffusion use from python
                is not relying on gradio webapp.

from a windows powershell:
    py -3.10 -m venv venv_a1111sdk
    .\venv_a1111sdk\scripts\activate.ps1
    python -m pip install pip --upgrade
    python -m pip install --verbose nvidia-cuda-runtime-cu11
    python -m pip install --verbose torch==2.1.0 torchvision --index-url https://download.pytorch.org/whl/cu118
    python -m pip --verbose install auto1111sdk
    python -m pip freeze >requirements.txt
    
    python thisfile.py

    deactivate


'''


import os
import base64
from io import BytesIO
from auto1111sdk import civit_download, RealEsrganPipeline, StableDiffusionPipeline, EsrganPipeline
from PIL import Image
import torch

def generate_image(outfit=""):
    print("Torch version:",torch.__version__)
    print("Is CUDA enabled?",torch.cuda.is_available())

    civit_url = 'https://civitai.com/models/251478/fashion-street-photographyandfilm-v1'
    model_path = 'ignition.safetensors'
    if not os.path.exists(model_path):
        print(f'downloading {model_path} from {civit_url}')
        civit_download(civit_url, model_path)
    else:
        print(f'using model {model_path}')


    print(f'Text to image, model={model_path}')
    pipe = StableDiffusionPipeline(model_path)

    prompt          = "outfit idea with {outfit}, 8k uhd, high quality, cinematic"
    negative_prompt = "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime), text, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck" #@param{type: 'string'}
    print(f'{prompt=}')
    print(f'{negative_prompt=}')

    num_images      = 1
    height          = 768 
    width           = 512
    steps           = 20 
    cfg_scale       = 7.5
    seed            = -1 
    sampler_name    = 'Euler' 
    # ["Euler a", "Euler", "LMS", "Heun", "DPM2", "DPM2 a", 
    #  "DPM++ 2S a", "DPM++ 2M", "DPM fast", "DPM adaptive", 
    #  "LMS Karras", "DPM2 Karras", "DPM2 a Karras", 
    #  "DPM++ 2S a Karras", "DPM++ 2M Karras", "DDIM", "PLMS"]

    output = pipe.generate_txt2img(
                        num_images = num_images, cfg_scale = cfg_scale, sampler_name = sampler_name, seed       = seed,
                        prompt     = prompt,     height    = height,    width        = width, 
                        negative_prompt = negative_prompt,              steps        = steps)

    image = output[0]
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    del pipe

    return img_base64


